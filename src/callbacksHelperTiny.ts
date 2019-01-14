// callbacks-helper-tiny - Copyright (C) 2018-2019 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License

export function clbWaitAll(
    fns: (( clb: ( err: Error | null, data?: any ) => void ) => void)[],
    clb: (err: Error | null, data?: any) => void
): void {
    const l: number = fns.length;

    if (0 === l) {
        clb(null, []);
        return;
    }

    let n: number = 0;
    let hasError: boolean = false;
    let i: number;
    let mixedResults: any[] = [];

    for (i=0; i<l; ++i) {
        (fns[i])( (err: Error | null, data?: any): void => {
            if (false === hasError) {
                if (err) {
                    hasError = true;
                    clb(err, data);
                }
                else {
                    mixedResults[n] = data;

                    if (++n === l) {
                        clb(null, mixedResults);
                    }
                }
            }
        });
    }
}



export function clbQueue(
    fns: (( clb: ( err: Error | null, data?: any ) => void ) => void)[],
    clb: (err: Error | null, data?: any) => void
): void {
    const l: number = fns.length;

    if (0 === l) {
        clb(null, []);
        return;
    }

    const maxStackCalls: number = 256;
    let stackCalls: number = maxStackCalls;

    let n: number = 0;
    let results: any[] = [];

    let next = (err: Error | null, data?: any): void => {
        if (err) {
            clb(err, data);
        }
        else {
            results[n] = data;

            if (++n === l) {
                clb(null, results);
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