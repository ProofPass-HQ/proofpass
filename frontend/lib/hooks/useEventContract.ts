// TODO: Rewrite for Stellar/Soroban once contract addresses and ABIs are available.
// This stub removes all window.ethereum / EVM references so the build passes.
// The return shape is preserved so existing call sites compile unchanged.

export interface EventData {
  eventId: string;
  organizer: string;
  metadataHash: string;
  createdAt: number;
  attendanceFee: string;
  isActive: boolean;
  maxAttendees: number;
  currentAttendees: number;
}

export interface EventMetadata {
  title: string;
  description: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  latitude?: number;
  longitude?: number;
}

const NOT_IMPLEMENTED =
  "useEventContract: Soroban implementation pending. EVM support has been removed.";

export const useEventContract = () => {
  const connectWallet = async (): Promise<string> => {
    throw new Error(NOT_IMPLEMENTED);
  };

  const createEvent = async (
    _metadata: EventMetadata,
    _attendanceFee: string,
    _maxAttendees: number
  ): Promise<{ eventId: string; txHash: string }> => {
    throw new Error(NOT_IMPLEMENTED);
  };

  const getEvent = async (_eventId: string): Promise<EventData> => {
    throw new Error(NOT_IMPLEMENTED);
  };

  const getMetadata = async (_metadataHash: string): Promise<EventMetadata> => {
    throw new Error(NOT_IMPLEMENTED);
  };

  const getOrganizerEvents = async (_organizer: string): Promise<string[]> => {
    console.warn(NOT_IMPLEMENTED);
    return [];
  };

  const toggleEventStatus = async (_eventId: string): Promise<string> => {
    throw new Error(NOT_IMPLEMENTED);
  };

  const getAllEventsWithMetadata = async (
    _organizerAddress?: string
  ): Promise<(EventData & EventMetadata)[]> => {
    console.warn(NOT_IMPLEMENTED);
    return [];
  };

  return {
    provider: null,
    signer: null,
    contract: null,
    account: "",
    isConnected: false,
    connectWallet,
    createEvent,
    getEvent,
    getMetadata,
    getOrganizerEvents,
    toggleEventStatus,
    getAllEventsWithMetadata,
  };
};
