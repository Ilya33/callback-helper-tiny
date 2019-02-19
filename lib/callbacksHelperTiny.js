"use strict";
// callbacks-helper-tiny - Copyright (C) 2018-2019 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License
Object.defineProperty(exports, "__esModule", { value: true });
function cbWaitAll(fns, cb) {
    const l = fns.length;
    if (0 === l) {
        cb(null);
        return;
    }
    let n = 0;
    let hasError = false;
    let i;
    for (i = 0; i < l; ++i) {
        (fns[i])((err) => {
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
exports.cbWaitAll = cbWaitAll;
function cbWaitAllWithData(fns, cb) {
    const l = fns.length;
    if (0 === l) {
        cb(null, []);
        return;
    }
    let n = 0;
    let hasError = false;
    let results = [];
    for (let i = 0; i < l; ++i) {
        (fns[i])((err, data) => {
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
exports.cbWaitAllWithData = cbWaitAllWithData;
function cbQueue(fns, cb, maxStackCalls = 256) {
    const l = fns.length;
    if (0 === l) {
        cb(null);
        return;
    }
    let stackCalls = maxStackCalls;
    let n = 0;
    const next = (err) => {
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
exports.cbQueue = cbQueue;
function cbQueueWithData(fns, cb, maxStackCalls = 256) {
    const l = fns.length;
    if (0 === l) {
        cb(null, []);
        return;
    }
    let stackCalls = maxStackCalls;
    let n = 0;
    let results = [];
    const next = (err, data) => {
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
exports.cbQueueWithData = cbQueueWithData;
// DEPRECATED
function clbWaitAll(fns, clb) {
    cbWaitAllWithData(fns, clb);
}
exports.clbWaitAll = clbWaitAll;
function clbQueue(fns, clb) {
    cbQueueWithData(fns, clb);
}
exports.clbQueue = clbQueue;
