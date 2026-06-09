"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/providers/wallet-provider";
import { WalletLogin } from "@/components/auth/WalletLogin";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { isConnected, isFreighterInstalled, connect, error, publicKey } =
    useWallet();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-proofpass-emerald"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-proofpass-emerald to-proofpass-teal flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-proofpass-gradient">
            ProofPass
          </h1>
          <p className="text-gray-600 mt-2">Where Proof Meets Profit</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
            <p className="text-gray-600 text-sm">
              Connect your Freighter wallet to get started
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {isFreighterInstalled === false && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-center">
                Freighter is not installed.{" "}
                <a
                  href="https://freighter.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  Install it here
                </a>{" "}
                to continue.
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center">
                {error}
              </p>
            )}

            {!isConnected && (
              <Button
                onClick={connect}
                disabled={isFreighterInstalled === false}
                className="w-full"
              >
                Connect Freighter
              </Button>
            )}

            {isConnected && publicKey && (
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-4 py-2 font-mono break-all text-center">
                {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
              </div>
            )}
          </div>

          {isConnected && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Next Step</span>
                </div>
              </div>
              <WalletLogin />
            </>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-sm text-gray-900 mb-2">
            Why do I need to connect Freighter?
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Freighter is a Stellar wallet that proves you own your public key.
            No passwords needed. Your wallet signs requests securely and
            your private key never leaves your device.
          </p>
        </div>
      </div>
    </div>
  );
}
