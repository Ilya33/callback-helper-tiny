// callback-helper-tiny - Copyright (C) 2018 Ilya Pavlov
// callback-helper-tiny is licensed under the MIT License
// v 0.1.0

export function clbWaitAll(
    fns: (( clb: ( err: any, data?: any ) => void ) => void)[],
    clb: (err: any, data?: any) => void
): void {
    let l: number = fns.length;
    let n: number = 0;
    let hasError: boolean = false;
    let i: number;
    let mixedResults: any[] = [];

    for (i=0; i<l; i++) {
        (fns[i])( function(err: any, data?: any): void {
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