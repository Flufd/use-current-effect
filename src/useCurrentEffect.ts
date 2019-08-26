import { useEffect } from "react";
type EffectState = { isCurrent: boolean };

// Essentially this is a wrapper around useEffect that passes
// in an mutable object with a isCurrent flag as the parameter
// This flag is passed into the effect callback and the `isCurrent` field
// can be used to see if the original effect was cleaned up or if the component was unmounted
export function useCurrentEffect(
  callback: ((effectState: EffectState) => void) | ((effectState: EffectState) => () => void),
  deps?: []
) {
  let effectState: EffectState = { isCurrent: true };
  useEffect(() => {
    const cleanup = callback(effectState);
    return () => {
      // We set the current flag to false in the cleanup
      effectState.isCurrent = false;
      cleanup && cleanup();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}