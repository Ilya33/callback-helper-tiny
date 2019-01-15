interface FnClb {
    (err: Error | null, data?: any): void;
}
export declare function clbWaitAll(fns: ((clb: FnClb) => void)[], clb: (err: Error | null, data: any[]) => void): void;
export declare function clbQueue(fns: ((clb: FnClb) => void)[], clb: (err: Error | null, data: any[]) => void): void;
export {};
