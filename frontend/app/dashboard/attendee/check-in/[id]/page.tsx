"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  CheckCircle,
  Wallet,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import Link from "next/link";
import { useWallet } from "@/providers/wallet-provider";
import { toast } from "sonner";
import { Header } from "@/components/header";
import { sdk } from "@farcaster/miniapp-sdk";

export default function CheckInPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { publicKey, isConnected } = useWallet();
  const [checkedIn, setCheckedIn] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [eventData, setEventData] = useState<any>(null);
  const [eventMetadata, setEventMetadata] = useState<any>(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [fid, setFid] = useState<string | null>(null);
  const [farcasterWallet, setFarcasterWallet] = useState<string | null>(null);

  // Check for Farcaster FID and wallet
  useEffect(() => {
    const storedFid = localStorage.getItem("fid");
    const storedWallet = localStorage.getItem("farcasterWallet");
    if (storedFid) setFid(storedFid);
    if (storedWallet) setFarcasterWallet(storedWallet);
    sdk.context
      .then((ctx) => {
        if (ctx?.user?.fid) {
          const fidString = ctx.user.fid.toString();
          setFid(fidString);
          localStorage.setItem("fid", fidString);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch event data from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`);
        if (!response.ok) { setEventLoading(false); return; }
        const data = await response.json();
        setEventData(data);
        if (data.metadataHash) {
          const metaResponse = await fetch(`/api/metadata/${data.metadataHash}`);
          const metadata = await metaResponse.json();
          setEventMetadata(metadata);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setEventLoading(false);
      }
    };
    fetchEvent();
  }, [params.id]);

  // Check if user already checked in
  useEffect(() => {
    const walletAddress = publicKey || farcasterWallet;
    if (!walletAddress) return;
    fetch(`/api/attendance/${params.id}/${walletAddress}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.verified) setAlreadyCheckedIn(true); })
      .catch(() => {});
  }, [params.id, publicKey, farcasterWallet]);

  const handleCheckIn = async () => {
    const walletAddress = publicKey || farcasterWallet;
    if (!eventData || !walletAddress) return;
    setIsCheckingIn(true);
    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: params.id, walletAddress }),
      });
      if (!response.ok) throw new Error("Check-in failed");
      const result = await response.json();
      setTxHash(result.transactionHash ?? null);
      setCheckedIn(true);
      toast.success("Successfully checked in!");
      setTimeout(() => router.push("/dashboard/attendee"), 3000);
    } catch (error: any) {
      console.error("Check-in error:", error);
      toast.error(error.message || "Failed to check in");
    } finally {
      setIsCheckingIn(false);
    }
  };

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <Card className="max-w-md">
            <CardHeader>
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <CardTitle className="text-center">Event Not Found</CardTitle>
              <CardDescription className="text-center">
                This event doesn&apos;t exist or has been removed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/events")} className="w-full">
                Browse Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isFree = !eventData.attendanceFee || eventData.attendanceFee === "0";
  const isEventFull = eventData.currentAttendees >= eventData.maxAttendees;

  if (checkedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-500" />
              <CardTitle className="text-3xl">Check-In Successful!</CardTitle>
              <CardDescription>
                You&apos;ve been verified on the Stellar network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">Event</p>
                <p className="text-lg font-bold">
                  {eventMetadata?.title || `Event #${params.id}`}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">Your Wallet</p>
                <p className="font-mono text-sm">{publicKey || farcasterWallet}</p>
              </div>
              {txHash && (
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Transaction Hash
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs truncate">{txHash}</p>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                        target="_blank"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Redirecting to your dashboard in 3 seconds...
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => router.push("/dashboard/attendee")}
                  className="w-full gradient-emerald-teal text-white"
                >
                  Go to Dashboard Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/events")}
                  className="w-full"
                >
                  Discover More Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-3xl">
                  {eventMetadata?.title || `Event #${params.id}`}
                </CardTitle>
                <CardDescription>
                  {eventMetadata?.description || "Loading event details..."}
                </CardDescription>
              </div>
              <Badge variant={eventData.isActive ? "default" : "secondary"}>
                {eventData.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    {Number(eventData.currentAttendees)} /{" "}
                    {Number(eventData.maxAttendees)} attendees
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Attendance Fee</p>
                  <p className="text-sm text-muted-foreground">
                    {isFree ? "Free" : `${eventData.attendanceFee} XLM`}
                  </p>
                </div>
              </div>
            </div>

            {alreadyCheckedIn && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  You have already checked in to this event.
                </p>
              </div>
            )}
            {!eventData.isActive && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-600 dark:text-red-400">
                  This event is not currently active.
                </p>
              </div>
            )}
            {isEventFull && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-600 dark:text-red-400">
                  This event has reached maximum capacity.
                </p>
              </div>
            )}

            <div className="border-t pt-6">
              {!isConnected && !farcasterWallet ? (
                <div className="text-center space-y-4">
                  <Wallet className="w-16 h-16 mx-auto text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                    <p className="text-muted-foreground">
                      Connect your Freighter wallet to check in to this event
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <ConnectWalletButton />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-accent/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Connected Wallet
                    </p>
                    {fid && (
                      <p className="text-xs text-primary mb-1">Farcaster FID: {fid}</p>
                    )}
                    <p className="text-sm font-mono w-full block sm:hidden">
                      {publicKey
                        ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
                        : farcasterWallet
                        ? `${farcasterWallet.slice(0, 6)}...${farcasterWallet.slice(-4)}`
                        : "Not connected"}
                    </p>
                    <p className="text-sm font-mono w-full hidden sm:block">
                      {publicKey || farcasterWallet || "Not connected"}
                    </p>
                  </div>

                  {!isFree && (
                    <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Attendance Fee</p>
                          <p className="text-sm text-muted-foreground">Payment required</p>
                        </div>
                        <p className="text-2xl font-bold">{eventData.attendanceFee} XLM</p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleCheckIn}
                    disabled={
                      !eventData.isActive ||
                      isEventFull ||
                      alreadyCheckedIn ||
                      isCheckingIn
                    }
                    className="w-full gradient-emerald-teal text-white h-12 text-lg"
                  >
                    {isCheckingIn ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Checking In...
                      </>
                    ) : alreadyCheckedIn ? (
                      "Already Checked In"
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Check In Now
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By checking in, you agree to have your attendance verified on the Stellar network
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
