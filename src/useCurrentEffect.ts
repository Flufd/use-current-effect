import { useEffect } from "react";
type EffectState = { isCurrent: boolean };

/**
 * Create useEffect with a parameter to track the life of the effect
 *
 * @param callback The effect to run, it will be passed a
 * {@link EffectState} that can be used to track if the effect was cleaned up
 * @param deps The dependencies of the effect. When they change,
 * the original effect's isCurrent state param will be set to false
 */
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
