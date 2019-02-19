export interface CbErrorOnly {
    (err: Error | null): void;
}
export declare function cbWaitAll(fns: ((cb: CbErrorOnly) => void)[], cb: CbErrorOnly): void;
export declare function cbQueue(fns: ((cb: CbErrorOnly) => void)[], cb: CbErrorOnly, maxStackCalls?: number): void;
export interface ClbWithOptionalData {
    (err: Error | null, data?: any): void;
}
export declare function clbWaitAll(fns: ((clb: ClbWithOptionalData) => void)[], clb: (err: Error | null, data: any[]) => void): void;
export declare function clbQueue(fns: ((clb: ClbWithOptionalData) => void)[], clb: (err: Error | null, data: any[]) => void): void;
