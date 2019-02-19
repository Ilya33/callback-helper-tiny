"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var callbacksHelperTiny_1 = require("../lib/callbacksHelperTiny");
var MAX_CLB_WAIT_TIME = 240;
describe('cbWaitAll', function () {
    it('empty array 0', function (done) {
        callbacksHelperTiny_1.cbWaitAll([], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('empty array 1', function (done) {
        var error = new Error('test error');
        callbacksHelperTiny_1.cbWaitAll([], function (err) {
            error = err;
        });
        chai_1.expect(error).to.be.a('null');
        done();
    });
    it('with error', function (done) {
        callbacksHelperTiny_1.cbWaitAll([
            function (cb) {
                setTimeout(function () { cb(null); }, 1);
            },
            function (cb) {
                setTimeout(function () { cb(new Error('test error')); }, 10);
            },
            function (cb) {
                setTimeout(function () { cb(null); }, 20);
            }
        ], function (err) {
            chai_1.expect(err).to.be.an('error');
            done();
        });
    });
    it('without error', function (done) {
        callbacksHelperTiny_1.cbWaitAll([
            function (cb) {
                setTimeout(function () { cb(null); }, 1);
            },
            function (cb) {
                setTimeout(function () { cb(null); }, 1);
            }
        ], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('1 thousand and 24 callbacks', function (done) {
        var l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        var fns = [];
        for (var i = 0; i < l; ++i) {
            fns[i] = function (cb) {
                setTimeout(function () { cb(null); }, Math.floor(Math.random() * 4));
            };
        }
        callbacksHelperTiny_1.cbWaitAll(fns, function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
});
describe('cbWaitAllWithData', function () {
    it('empty array 0', function (done) {
        callbacksHelperTiny_1.cbWaitAllWithData([], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('empty array 1', function (done) {
        var error = new Error('test error');
        callbacksHelperTiny_1.cbWaitAllWithData([], function (err) {
            error = err;
        });
        chai_1.expect(error).to.be.a('null');
        done();
    });
    it('with error', function (done) {
        callbacksHelperTiny_1.cbWaitAllWithData([
            function (cb) {
                setTimeout(function () { cb(null, 1); }, 1);
            },
            function (cb) {
                setTimeout(function () { cb(new Error('test error')); }, 10);
            },
            function (cb) {
                setTimeout(function () { cb(null, 2); }, 20);
            }
        ], function (err) {
            chai_1.expect(err).to.be.an('error');
            done();
        });
    });
    it('without error', function (done) {
        callbacksHelperTiny_1.cbWaitAllWithData([
            function (cb) {
                setTimeout(function () { cb(null, 1); }, 20);
            },
            function (cb) {
                setTimeout(function () { cb(null, '2'); }, 120);
            },
            function (cb) {
                setTimeout(function () { cb(null, 4); }, 1);
            }
        ], function (err, data) {
            chai_1.expect(err).to.be.a('null');
            chai_1.expect(data).to.be.an('array').that.eql([1, '2', 4]);
            done();
        });
    });
    it('1 thousand and 24 callbacks', function (done) {
        var l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        var fns = [];
        var _loop_1 = function (i) {
            fns[i] = function (cb) {
                setTimeout(function () { cb(null, i); }, Math.floor(Math.random() * 4));
            };
        };
        for (var i = 0; i < l; ++i) {
            _loop_1(i);
        }
        callbacksHelperTiny_1.cbWaitAllWithData(fns, function (err, data) {
            chai_1.expect(err).to.be.a('null');
            var i = 0;
            chai_1.expect(data).to.be.an('array').that.eql(Array(l).fill(0).map(function () {
                return i++;
            }));
            done();
        });
    });
});
describe('cbQueue', function () {
    it('empty array 0', function (done) {
        callbacksHelperTiny_1.cbQueue([], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('empty array 1', function (done) {
        var error = new Error('test error');
        callbacksHelperTiny_1.cbQueue([], function (err) {
            error = err;
        });
        chai_1.expect(error).to.be.a('null');
        done();
    });
    it('with error', function (done) {
        callbacksHelperTiny_1.cbQueue([
            function (cb) {
                setTimeout(function () { cb(null); }, 1);
            },
            function (cb) {
                setTimeout(function () { cb(new Error('test error')); }, 10);
            },
            function (cb) {
                setTimeout(function () { cb(null); }, 20);
            }
        ], function (err) {
            chai_1.expect(err).to.be.an('error');
            done();
        });
    });
    it('without error', function (done) {
        callbacksHelperTiny_1.cbQueue([
            function (cb) {
                setTimeout(function () { cb(null); }, 1);
            },
            function (cb) {
                setTimeout(function () { cb(null); }, 1);
            }
        ], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('1 thousand and 24 callbacks', function (done) {
        var l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        var fns = [];
        for (var i = 0; i < l; ++i) {
            fns[i] = function (clb) {
                setTimeout(function () { clb(null); }, Math.floor(Math.random() * 4));
            };
        }
        callbacksHelperTiny_1.cbQueue(fns, function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
});
describe('cbQueueWithData', function () {
    it('empty array 0', function (done) {
        callbacksHelperTiny_1.cbQueueWithData([], function (err) {
            chai_1.expect(err).to.be.a('null');
            done();
        });
    });
    it('empty array 1', function (done) {
        var error = new Error('test error');
        callbacksHelperTiny_1.cbQueueWithData([], function (err) {
            error = err;
        });
        chai_1.expect(error).to.be.a('null');
        done();
    });
    it('with error', function (done) {
        callbacksHelperTiny_1.cbQueueWithData([
            function (cb) {
                setTimeout(function () { cb(null, 1); }, 1);
            },
            function (cb) {
                setTimeout(function () { cb(new Error('test error')); }, 10);
            },
            function (cb) {
                setTimeout(function () { cb(null, 2); }, 20);
            }
        ], function (err) {
            chai_1.expect(err).to.be.an('error');
            done();
        });
    });
    it('without error', function (done) {
        callbacksHelperTiny_1.cbQueueWithData([
            function (cb) {
                setTimeout(function () { cb(null, 1); }, 20);
            },
            function (cb) {
                setTimeout(function () { cb(null, '2'); }, 120);
            },
            function (cb) {
                setTimeout(function () { cb(null, 4); }, 1);
            }
        ], function (err, data) {
            chai_1.expect(err).to.be.a('null');
            chai_1.expect(data).to.be.an('array').that.eql([1, '2', 4]);
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
        callbacksHelperTiny_1.cbQueueWithData(fns, function (err, data) {
            chai_1.expect(err).to.be.a('null');
            var i = 0;
            chai_1.expect(data).to.be.an('array').that.eql(Array(l).fill(0).map(function () {
                return i++;
            }));
            done();
        });
    });
});
