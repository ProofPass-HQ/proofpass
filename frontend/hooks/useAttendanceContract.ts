// TODO: Rewrite for Stellar/Soroban once contract addresses and ABIs are available.
// This stub removes all window.ethereum / EVM references so the build passes.
// The return shape is preserved so existing call sites compile unchanged.

export interface AttendanceRecord {
  eventId: number;
  attendee: string;
  checkedInAt: number;
  nftTokenId: number;
  hasNFT: boolean;
  transactionHash?: string;
}

export const useAttendanceContract = () => {
  const connectWallet = async (): Promise<string> => {
    throw new Error(
      "useAttendanceContract: Soroban implementation pending. EVM support has been removed."
    );
  };

  const getMyAttendance = async (): Promise<AttendanceRecord[]> => {
    console.warn(
      "useAttendanceContract: Soroban implementation pending. Returning empty attendance list."
    );
    return [];
  };

  return {
    provider: null,
    contract: null,
    account: "",
    isConnected: false,
    connectWallet,
    getMyAttendance,
  };
};
