'use client';
import React, { useState } from 'react';
import { useWallet } from '@/providers/wallet-provider';
import { signMessage } from '@stellar/freighter-api';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { authApi } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export function WalletLogin() {
  const { publicKey, isConnected, network } = useWallet();
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!publicKey) {
      setError('Please connect your wallet first');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Get nonce from backend
      const { nonce } = await authApi.getNonce(publicKey);

      // Step 2: Create message to sign
      const message = [
        'Sign this message to authenticate with ProofPass.',
        `Wallet: ${publicKey}`,
        `Nonce: ${nonce}`,
        'This request will not trigger a blockchain transaction or cost any gas fees.',
      ].join('\n');

      // Step 3: Request signature from Freighter
      const networkPassphrase =
        network === 'MAINNET'
          ? 'Public Global Stellar Network ; September 2015'
          : 'Test SDF Network ; September 2015';
      const signResult = await signMessage(message, { networkPassphrase });
      const signature = signResult.signedMessage;

      // Step 4: Verify signature with backend
      const { accessToken, user } = await authApi.verify({
        walletAddress: publicKey,
        signature,
        nonce,
      });

      // Step 5: Store token and user in context
      login(accessToken, user);

      // Step 6: Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      if (err?.message?.includes('User declined') || err?.message?.includes('rejected')) {
        setError('Signature request was rejected. Please try again.');
      } else if (err.response?.status === 401) {
        setError('Authentication failed. Invalid signature.');
      } else if (err.response?.status === 400) {
        setError('Invalid wallet address format.');
      } else if (!err.response) {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div>
        <p>Please connect your wallet using the button above to sign in.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Connected Wallet:</p>
        <p className="font-mono text-sm font-semibold break-all">{publicKey}</p>
      </div>
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-proofpass-gradient hover:opacity-90"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing message...
          </>
        ) : (
          'Sign Message to Login'
        )}
      </Button>
      <p className="text-xs text-gray-500 text-center">
        By signing, you agree to our Terms of Service. This is a free action and won't cost any gas.
      </p>
    </div>
  );
}
