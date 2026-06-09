// TODO: Chain switching is EVM-specific and not applicable to Stellar/Freighter.
// Freighter handles network selection internally via its own UI.
// This stub preserves the return shape so call sites compile unchanged.

export function useChainSwitcher() {
  return {
    isCorrectChain: true,
    isOnLiskSepolia: true,
    switchToLiskSepolia: () => {},
    isSwitching: false,
  };
}
