export interface ClbWithOptionalData {
    (err: Error | null, data?: any): void;
}
export declare function clbWaitAll(fns: ((clb: ClbWithOptionalData) => void)[], clb: (err: Error | null, data: any[]) => void): void;
export declare function clbQueue(fns: ((clb: ClbWithOptionalData) => void)[], clb: (err: Error | null, data: any[]) => void): void;
