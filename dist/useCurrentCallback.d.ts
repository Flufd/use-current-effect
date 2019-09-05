declare type CallbackState = {
    isCurrent: boolean;
};
export declare function useCurrentCallback<T extends (...args: any[]) => any>(callbackFactory: (callbackState: CallbackState) => T, deps?: []): (args: any) => void;
export {};
