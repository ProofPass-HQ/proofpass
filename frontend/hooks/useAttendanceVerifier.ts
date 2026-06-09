// hooks/useAttendanceVerifier.ts
// TODO: Rewrite for Stellar/Soroban once contract integration is complete.
// All contract reads/writes now go through the backend API.
// Return shapes are preserved so existing call sites compile unchanged.

export function useAttendanceVerifier() {
  const checkIn = async (_eventId: string, _attendanceFee: string) => {
    return { txHash: undefined, isPending: false, error: null };
  };

  const useVerifyAttendance = (_eventId: string, _attendeeAddress: string) => {
    return { isVerified: false, isLoading: false, error: null };
  };

  const useEventAttendees = (_eventId: string) => {
    return { attendees: [] as string[], isLoading: false, error: null };
  };

  const useAttendeeHistory = (_attendeeAddress: string) => {
    return { eventIds: [] as string[], isLoading: false, error: null };
  };

  const useAttendanceCount = (_eventId: string) => {
    return { count: 0, isLoading: false, error: null };
  };

  const useEvent = (_eventId: string) => {
    return { event: null, isLoading: false, error: null };
  };

  return {
    checkIn,
    useVerifyAttendance,
    useEventAttendees,
    useAttendeeHistory,
    useAttendanceCount,
    useEvent,
  };
}
