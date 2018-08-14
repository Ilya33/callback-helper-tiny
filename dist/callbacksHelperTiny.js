"use strict";
// callbacks-helper-tiny - Copyright (C) 2018 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License
Object.defineProperty(exports, "__esModule", { value: true });
function clbWaitAll(fns, clb) {
    let l = fns.length;
    if (0 === l) {
        clb(null, []);
        return;
    }
    let n = 0;
    let hasError = false;
    let i;
    let mixedResults = [];
    for (i = 0; i < l; i++) {
        (fns[i])(function (err, data) {
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
    let l = fns.length;
    if (0 === l) {
        clb(null, []);
        return;
    }
    let n = 0;
    let results = [];
    let next = function (err, data) {
        if (err) {
            clb(err, data);
        }
        else {
            results[n] = data;
            if (++n === l) {
                clb(null, results);
            }
            else {
                (fns[n])(next);
            }
        }
    };
    (fns[n])(next);
}
exports.clbQueue = clbQueue;
