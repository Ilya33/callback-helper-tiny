"use strict";
// callbacks-helper-tiny - Copyright (C) 2018-2019 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License
Object.defineProperty(exports, "__esModule", { value: true });
function cbWaitAll(fns, cb) {
    var l = fns.length;
    if (0 === l) {
        cb(null);
        return;
    }
    var n = 0;
    var hasError = false;
    var i;
    for (i = 0; i < l; ++i) {
        (fns[i])(function (err) {
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
    var l = fns.length;
    if (0 === l) {
        cb(null, []);
        return;
    }
    var n = 0;
    var hasError = false;
    var results = [];
    var _loop_1 = function (i) {
        (fns[i])(function (err, data) {
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
    };
    for (var i = 0; i < l; ++i) {
        _loop_1(i);
    }
}
exports.cbWaitAllWithData = cbWaitAllWithData;
function cbQueue(fns, cb, maxStackCalls) {
    if (maxStackCalls === void 0) { maxStackCalls = 256; }
    var l = fns.length;
    if (0 === l) {
        cb(null);
        return;
    }
    var stackCalls = maxStackCalls;
    var n = 0;
    var next = function (err) {
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
                    setTimeout(function () { return (fns[n])(next); }, 0);
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
function cbQueueWithData(fns, cb, maxStackCalls) {
    if (maxStackCalls === void 0) { maxStackCalls = 256; }
    var l = fns.length;
    if (0 === l) {
        cb(null, []);
        return;
    }
    var stackCalls = maxStackCalls;
    var n = 0;
    var results = [];
    var next = function (err, data) {
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
                    setTimeout(function () { return (fns[n])(next); }, 0);
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
