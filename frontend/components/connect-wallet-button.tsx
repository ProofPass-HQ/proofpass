"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut, User, Settings, Users, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";
import { useWallet } from "@/providers/wallet-provider";
import { getWalletFromFID } from "@/lib/api/getWalletFromFID";

export function ConnectWalletButton() {
  const [currentRole, setCurrentRole] = useState<"organizer" | "attendee" | null>(null);
  const [isBaseApp, setIsBaseApp] = useState(false);
  const [fid, setFid] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { isConnected, publicKey, isFreighterInstalled, connect, disconnect } =
    useWallet();

  useEffect(() => {
    if (pathname.includes("/dashboard/organizer")) {
      setCurrentRole("organizer");
    } else if (pathname.includes("/dashboard/attendee")) {
      setCurrentRole("attendee");
    } else {
      setCurrentRole(null);
    }
  }, [pathname]);

  useEffect(() => {
    const storedFid = localStorage.getItem("fid");
    if (storedFid) {
      setFid(storedFid);
      setIsBaseApp(true);
    }

    sdk.context
      .then((ctx) => {
        if (ctx?.user?.fid) {
          const fidString = ctx.user.fid.toString();
          setIsBaseApp(true);
          setFid(fidString);
          localStorage.setItem("fid", fidString);
        }
      })
      .catch(() => {
        if (!storedFid) setIsBaseApp(false);
      });
  }, []);

  useEffect(() => {
    async function fetchWallet() {
      if (!fid) return;
      if (isConnected && publicKey) return;

      const storedWallet = localStorage.getItem("farcasterWallet");
      if (storedWallet) return;

      const wallet = await getWalletFromFID(fid);
      if (wallet) {
        localStorage.setItem("walletAddress", wallet);
        localStorage.setItem("farcasterWallet", wallet);
        window.dispatchEvent(
          new CustomEvent("farcasterWalletReady", { detail: { wallet, fid } })
        );
      }
    }
    fetchWallet();
  }, [fid, isConnected, publicKey]);

  useEffect(() => {
    if (isConnected && publicKey && !currentRole) {
      localStorage.setItem("walletAddress", publicKey);
      if (!pathname.includes("/dashboard") && !pathname.includes("/select-role")) {
        router.push("/select-role");
      }
    }
  }, [isConnected, publicKey, currentRole, pathname, router]);

  const handleDisconnect = () => {
    localStorage.removeItem("fid");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("farcasterWallet");
    setCurrentRole(null);
    setFid(null);
    disconnect();
    router.push("/");
  };

  const handleSwitchRole = () => {
    if (currentRole === "organizer") {
      router.push("/dashboard/attendee");
    } else {
      router.push("/dashboard/organizer");
    }
  };

  const getIdentifier = () => {
    if (fid) return `FID: ${fid}`;
    if (publicKey) return `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`;
    return null;
  };

  const identifier = getIdentifier();

  if ((isConnected && publicKey) || fid) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gradient-emerald-teal text-white hover:opacity-90 transition-opacity">
            <User className="w-4 h-4 mr-2" />
            {identifier}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {currentRole && (
            <>
              <DropdownMenuItem onClick={handleSwitchRole} className="cursor-pointer">
                {currentRole === "organizer" ? (
                  <>
                    <UserCircle className="w-4 h-4 mr-2" />
                    Switch to Attendee
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Switch to Organizer
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={() => router.push("/settings")}
            className="cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDisconnect}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isBaseApp && !fid) return null;

  return (
    <Button
      onClick={connect}
      disabled={isFreighterInstalled === false}
      className="gradient-emerald-teal text-white hover:opacity-90 transition-opacity"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isFreighterInstalled === false ? "Install Freighter" : "Connect Wallet"}
    </Button>
  );
}
