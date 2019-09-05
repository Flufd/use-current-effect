import { useCallback, useEffect } from "react";
type CallbackState = { isCurrent: boolean };

/**
 * Create useCurrentCallback with a parameter to track the life of the callback
 *
 * @param callbackFactory The callback factory function, allowing injection of the
 * {@link CallbackState} that can be used to track if the callback's dependencies were altered
 * @param deps The dependencies of the effect. When they change,
 * the original callback's isCurrent state param will be set to false
 */
export function useCurrentCallback<T extends (...args: any[]) => any>(
  callbackFactory: (callbackState: CallbackState) => T,
  deps?: []
): (args: any) => void {
  let state = { isCurrent: true };

  useEffect(() => {
    return () => {
      state.isCurrent = false;
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  // create the callback using the factory function, injecting the state
  return useCallback(callbackFactory(state), deps);
}
