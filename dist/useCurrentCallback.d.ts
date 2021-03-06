import { DependencyList } from "react";
declare type CheckCurrent = () => boolean;
export declare function useCurrentCallback<T extends (...args: any[]) => any>(callbackFactory: (isCurrent: CheckCurrent) => T, deps?: DependencyList): (args: any) => void;
export {};
