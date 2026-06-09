"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  network: "TESTNET" | "MAINNET" | null;
  isFreighterInstalled: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  publicKey: null,
  network: null,
  isFreighterInstalled: false,
  connect: async () => {},
  disconnect: () => {},
  error: null,
});

export const useWallet = () => useContext(WalletContext);

const queryClient = new QueryClient();

const TESTNET_PASSPHRASE = "Test SDF Network ; September 2015";
const MAINNET_PASSPHRASE = "Public Global Stellar Network ; September 2015";

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [network, setNetwork] = useState<"TESTNET" | "MAINNET" | null>(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { isConnected: checkConnected } = await import(
          "@stellar/freighter-api"
        );
        const result = await checkConnected();
        if (cancelled === false) setIsFreighterInstalled(result.isConnected);
      } catch {
        if (cancelled === false) setIsFreighterInstalled(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const connect = async () => {
    setError(null);
    try {
      const { requestAccess, getAddress, getNetworkDetails } = await import(
        "@stellar/freighter-api"
      );

      if (isFreighterInstalled === false) {
        setError(
          "Freighter is not installed. Visit https://freighter.app to install it."
        );
        return;
      }

      const accessResult = await requestAccess();
      if (accessResult.error) {
        throw new Error(accessResult.error.message);
      }

      const addressResult = await getAddress();
      if (addressResult.error) {
        throw new Error(addressResult.error.message);
      }

      const networkResult = await getNetworkDetails();
      if (networkResult.error) {
        throw new Error(networkResult.error.message);
      }

      let resolvedNetwork: "TESTNET" | "MAINNET" | null = null;
      if (networkResult.networkPassphrase === TESTNET_PASSPHRASE) {
        resolvedNetwork = "TESTNET";
      } else if (networkResult.networkPassphrase === MAINNET_PASSPHRASE) {
        resolvedNetwork = "MAINNET";
      }

      setPublicKey(addressResult.address);
      setNetwork(resolvedNetwork);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setPublicKey(null);
    setNetwork(null);
    setError(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        publicKey,
        network,
        isFreighterInstalled,
        connect,
        disconnect,
        error,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors />
      </QueryClientProvider>
    </WalletContext.Provider>
  );
}
