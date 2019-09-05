declare type EffectState = {
    isCurrent: boolean;
};
export declare function useCurrentEffect(callback: ((effectState: EffectState) => void) | ((effectState: EffectState) => () => void), deps?: []): void;
export {};
