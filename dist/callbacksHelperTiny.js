"use strict";
// callbacks-helper-tiny - Copyright (C) 2018-2019 Ilya Pavlov
// callbacks-helper-tiny is licensed under the MIT License
Object.defineProperty(exports, "__esModule", { value: true });
function clbWaitAll(fns, clb) {
    var l = fns.length;
    if (0 === l) {
        clb(null, []);
        return;
    }
    var n = 0;
    var hasError = false;
    var i;
    var mixedResults = [];
    for (i = 0; i < l; ++i) {
        (fns[i])(function (err, data) {
            if (false === hasError) {
                if (err) {
                    hasError = true;
                    clb(err, []);
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
    var l = fns.length;
    if (0 === l) {
        clb(null, []);
        return;
    }
    var maxStackCalls = 256;
    var stackCalls = maxStackCalls;
    var n = 0;
    var results = [];
    var next = function (err, data) {
        if (err) {
            clb(err, []);
        }
        else {
            results[n] = data;
            if (++n === l) {
                clb(null, results);
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
exports.clbQueue = clbQueue;
