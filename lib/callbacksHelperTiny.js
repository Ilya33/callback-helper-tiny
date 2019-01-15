"use strict";
// callbacks-helper-tiny - Copyright (C) 2018-2019 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License
Object.defineProperty(exports, "__esModule", { value: true });
function clbWaitAll(fns, clb) {
    const l = fns.length;
    if (0 === l) {
        clb(null, []);
        return;
    }
    let n = 0;
    let hasError = false;
    let i;
    let mixedResults = [];
    for (i = 0; i < l; ++i) {
        (fns[i])((err, data) => {
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
exports.clbWaitAll = clbWaitAll;
function clbQueue(fns, clb) {
    const l = fns.length;
    if (0 === l) {
        clb(null, []);
        return;
    }
    const maxStackCalls = 256;
    let stackCalls = maxStackCalls;
    let n = 0;
    let results = [];
    const next = (err, data) => {
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
                    setTimeout(() => (fns[n])(next), 0);
                }
                else {
                    (fns[n])(next);
                }
            }
        }
    };
    (fns[n])(next);
}
exports.clbQueue = clbQueue;
