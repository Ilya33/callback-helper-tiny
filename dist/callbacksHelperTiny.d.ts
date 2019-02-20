export interface CbErrorOnly {
    (err: Error | null): void;
}
export interface CbWithOptionalData {
    (err: Error | null, data?: any): void;
}
export declare function cbWaitAll(fns: ((cb: CbErrorOnly) => void)[], cb: CbErrorOnly): void;
export declare function cbWaitAllWithData(fns: ((cb: CbWithOptionalData) => void)[], cb: (err: Error | null, data: any[]) => void): void;
export declare function cbQueue(fns: ((cb: CbErrorOnly) => void)[], cb: CbErrorOnly, maxStackCalls?: number): void;
export declare function cbQueueWithData(fns: ((cb: CbWithOptionalData) => void)[], cb: (err: Error | null, data: any[]) => void, maxStackCalls?: number): void;
export declare function clbWaitAll(fns: ((clb: CbWithOptionalData) => void)[], clb: (err: Error | null, data: any[]) => void): void;
export declare function clbQueue(fns: ((clb: CbWithOptionalData) => void)[], clb: (err: Error | null, data: any[]) => void): void;
