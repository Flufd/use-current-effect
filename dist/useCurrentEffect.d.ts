import { DependencyList } from "react";
declare type CheckCurrent = () => boolean;
export declare function useCurrentEffect(callback: ((isCurrent: CheckCurrent) => void) | ((isCurrent: CheckCurrent) => () => void), deps?: DependencyList): void;
export {};
