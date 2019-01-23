"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var callbacksHelperTiny_1 = require("../lib/callbacksHelperTiny");
var MAX_CLB_WAIT_TIME = 240;
describe('clbWaitAll', function () {
    it('empty array 0', function (done) {
        callbacksHelperTiny_1.clbWaitAll([], function (err, data) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('empty array 1', function (done) {
        var error = new Error('test error');
        callbacksHelperTiny_1.clbWaitAll([], function (err, data) {
            error = err;
        });
        chai_1.expect(error).to.be.a('null');
        done();
    });
    it('with error', function (done) {
        callbacksHelperTiny_1.clbWaitAll([
            function (clb) {
                setTimeout(function () { clb(null); }, 1);
            },
            function (clb) {
                setTimeout(function () { clb(null, 2); }, 1);
            },
            function (clb) {
                setTimeout(function () { clb(new Error('test error')); }, 20);
            }
        ], function (err) {
            chai_1.expect(err).to.be.an('error');
            done();
        });
    });
    it('without data', function (done) {
        callbacksHelperTiny_1.clbWaitAll([
            function (clb) {
                setTimeout(function () { clb(null); }, 1);
            },
            function (clb) {
                setTimeout(function () { clb(null); }, 1);
            }
        ], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('with data', function (done) {
        callbacksHelperTiny_1.clbWaitAll([
            function (clb) {
                setTimeout(function () { clb(null, '42'); }, 20);
            },
            function (clb) {
                setTimeout(function () { clb(null, 8); }, 1);
            }
        ], function (err, unsortedData) {
            chai_1.expect(err).to.be.a('null');
            chai_1.expect(unsortedData).to.be.an('array');
            unsortedData.sort();
            chai_1.expect(unsortedData).to.be.an('array').that.eql(['42', 8]);
            done();
        });
    });
    it('1 thousand and 24 callbacks', function (done) {
        var l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        var fns = [];
        var _loop_1 = function (i) {
            fns[i] = function (clb) {
                setTimeout(function () { clb(null, i); }, Math.floor(Math.random() * 4));
            };
        };
        for (var i = 0; i < l; ++i) {
            _loop_1(i);
        }
        callbacksHelperTiny_1.clbWaitAll(fns, function (err, unsortedData) {
            chai_1.expect(err).to.be.a('null');
            unsortedData.sort(function (a, b) { return a > b ? 1 : -1; });
            var i = 0;
            chai_1.expect(unsortedData).to.be.an('array').that.eql(Array(l).fill(0).map(function () {
                return i++;
            }));
            done();
        });
    });
});
describe('clbQueue', function () {
    it('empty array 0', function (done) {
        callbacksHelperTiny_1.clbQueue([], function (err, data) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('empty array 1', function (done) {
        var error = new Error('test error');
        callbacksHelperTiny_1.clbQueue([], function (err, data) {
            error = err;
        });
        chai_1.expect(error).to.be.a('null');
        done();
    });
    it('with error', function (done) {
        callbacksHelperTiny_1.clbQueue([
            function (clb) {
                setTimeout(function () { clb(null); }, 1);
            },
            function (clb) {
                setTimeout(function () { clb(null, 2); }, 1);
            },
            function (clb) {
                setTimeout(function () { clb(new Error('test error')); }, 20);
            }
        ], function (err) {
            chai_1.expect(err).to.be.an('error');
            done();
        });
    });
    it('without data', function (done) {
        callbacksHelperTiny_1.clbQueue([
            function (clb) {
                setTimeout(function () { clb(null); }, 1);
            },
            function (clb) {
                setTimeout(function () { clb(null); }, 1);
            }
        ], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('with data', function (done) {
        callbacksHelperTiny_1.clbQueue([
            function (clb) {
                setTimeout(function () { clb(null, '42'); }, 20);
            },
            function (clb) {
                setTimeout(function () { clb(null, 8); }, 1);
            }
        ], function (err, data) {
            chai_1.expect(err).to.be.a('null');
            chai_1.expect(data).to.be.an('array').that.eql(['42', 8]);
            done();
        });
    });
    it('1 thousand and 24 callbacks', function (done) {
        var l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        var fns = [];
        var _loop_2 = function (i) {
            fns[i] = function (clb) {
                setTimeout(function () { clb(null, i); }, Math.floor(Math.random() * 4));
            };
        };
        for (var i = 0; i < l; ++i) {
            _loop_2(i);
        }
        callbacksHelperTiny_1.clbQueue(fns, function (err, data) {
            chai_1.expect(err).to.be.a('null');
            var i = 0;
            chai_1.expect(data).to.be.an('array').that.eql(Array(l).fill(0).map(function () {
                return i++;
            }));
            done();
        });
    });
});
