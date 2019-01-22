"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var callbacksHelperTiny_1 = require("../lib/callbacksHelperTiny");
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
    var suite = this;
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
    /*
        it('without error', (done) => {
            cht.clbQueue([
                    (clb) => {
                        setTimeout( () => { clb(null) }, 1);
                    },
                    (clb) => {
                        setTimeout( () => { clb(null) }, 1);
                    }
                ],
                (err) => {
                    assert.equal(err, null);
                    done();
            });
        });
    
    
        it('with error', (done) => {
            cht.clbQueue([
                    (clb) => {
                        setTimeout( () => { clb(null) }, 1);
                    },
                    (clb) => {
                        setTimeout( () => { clb( new Error('error') ) }, 1);
                    }
                ],
                (err) => {
                    expect(err).to.be.an('error');
                    done();
            });
        });
    
    
        it('without error & with data', (done) => {
            cht.clbQueue([
                    (clb) => {
                        setTimeout( () => { clb(null, 8) }, 1);
                    },
                    (clb) => {
                        setTimeout( () => { clb(null, 7) }, 1);
                    }
                ],
                (err, data) => {
                    assert.equal(err, null);
                    assert.equal(data[0], 8);
                    assert.equal(data[1], 7);
                    done();
            });
        });
    
    
        it('with error & with error data', (done) => {
            cht.clbQueue([
                    (clb) => {
                        setTimeout( () => { clb(null, 8) }, 1);
                    },
                    (clb) => {
                        setTimeout( () => { clb( new Error('error'), 42 ) }, 1);
                    }
                ],
                (err, data) => {
                    expect(err).to.be.an('error');
                    assert.equal(data, 42);
                    done();
            });
        });
    
    
        it('empty array', (done) => {
            cht.clbQueue([],
                (err, data) => {
                    assert.equal(err, null);
                    done();
            });
        });
    
    
        it('1 thousand and 24 callbacks', function(done) {
            var l = 1024;
            var fns = [];
    
            this.timeout(120 * l);
    
            for (var i=0; i<l; i++) {
                fns[i] = (clb) => {
                    setTimeout( () => { clb(null, ++i) }, 1);
                }
            }
    
            i = -1;
            cht.clbQueue(fns,
                (err, data) => {
                    assert.equal(err, null);
    
                    for (var i=0; i<l; i++) {
                        assert.equal(data[i], i);
                    }
    
                    done();
            });
        });
    */
});
