// callbacks-helper-tiny - Copyright (C) 2018-2019 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License

export interface CbErrorOnly {
    ( err: Error | null ): void
}


export interface CbWithOptionalData {
    ( err: Error | null, data?: any ): void
}



export function cbWaitAll(
    fns: (( cb: CbErrorOnly ) => void)[],
    cb: CbErrorOnly
): void {
    const l: number = fns.length;

    if (0 === l) {
        cb(null);
        return;
    }

    let n: number = 0;
    let hasError: boolean = false;
    let i: number;

    for (i=0; i<l; ++i) {
        (fns[i])( (err) => {
            if (false === hasError) {
                if (err) {
                    hasError = true;
                    cb(err);
                }
                else if (++n === l) {
                    cb(null);
                }
            }
        });
    }
}



export function cbWaitAllWithData(
    fns: (( cb: CbWithOptionalData ) => void)[],
    cb: (err: Error | null, data: any[]) => void
): void {
    const l: number = fns.length;

    if (0 === l) {
        cb(null, []);
        return;
    }

    let n: number = 0;
    let hasError: boolean = false;
    let results: any[] = [];

    for (let i: number=0; i<l; ++i) {
        (fns[i])( (err, data) => {
            if (false === hasError) {
                if (err) {
                    hasError = true;
                    cb(err, []);
                }
                else {
                    results[i] = data;

                    if (++n === l) {
                        cb(null, results);
                    }
                }
            }
        });
    }
}



export function cbQueue(
    fns: (( cb: CbErrorOnly ) => void)[],
    cb: CbErrorOnly,
    maxStackCalls = 256
): void {
    const l: number = fns.length;

    if (0 === l) {
        cb(null);
        return;
    }

    let stackCalls: number = maxStackCalls;
    let n: number = 0;

    const next: CbErrorOnly = (err) => {
        if (err) {
            cb(err);
        }
        else {
            if (++n === l) {
                cb(null);
            }
            else {
                if (0 === --stackCalls) {
                    stackCalls = maxStackCalls;

                    setTimeout( () => (fns[n])(next), 0);
                }
                else {
                    (fns[n])(next);
                }
            }
        }
    };

    (fns[n])(next);
}



export function cbQueueWithData(
    fns: (( cb: CbWithOptionalData ) => void)[],
    cb: (err: Error | null, data: any[]) => void,
    maxStackCalls = 256
): void {
    const l: number = fns.length;

    if (0 === l) {
        cb(null, []);
        return;
    }

    let stackCalls: number = maxStackCalls;
    let n: number = 0;
    let results: any[] = [];

    const next: CbWithOptionalData = (err, data) => {
        if (err) {
            cb(err, []);
        }
        else {
            results[n] = data;

            if (++n === l) {
                cb(null, results);
            }
            else {
                if (0 === --stackCalls) {
                    stackCalls = maxStackCalls;

                    setTimeout( () => (fns[n])(next), 0);
                }
                else {
                    (fns[n])(next);
                }
            }
        }
    };

    (fns[n])(next);
}



// DEPRECATED
export function clbWaitAll(
    fns: (( clb: CbWithOptionalData ) => void)[],
    clb: (err: Error | null, data: any[]) => void
): void {
    cbWaitAllWithData(fns, clb);
}

export function clbQueue(
    fns: (( clb: CbWithOptionalData ) => void)[],
    clb: (err: Error | null, data: any[]) => void
): void {
    cbQueueWithData(fns, clb);
}