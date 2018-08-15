'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var cht = require('../dist/callbacksHelperTiny.js');



describe('clbWaitAll', function() {
    it('without error', (done) => {
        cht.clbWaitAll([
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
        cht.clbWaitAll([
                (clb) => {
                    setTimeout( () => { clb(null) }, 1);
                },
                (clb) => {
                    setTimeout( () => { clb( new Error('error') ) }, 2);
                }
            ],
            (err) => {
                expect(err).to.be.an('error');
                done();
        });
    });


    it('without error & with data', (done) => {
        cht.clbWaitAll([
                (clb) => {
                    setTimeout( () => { clb(null, 8) }, 2);
                },
                (clb) => {
                    setTimeout( () => { clb(null, 7) }, 1);
                }
            ],
            (err, data) => {
                assert.equal(err, null);
                data = data.sort( (a, b) => { return a > b ?1 :a === b ?0 :-1; } );
                assert.equal(data[0], 7);
                assert.equal(data[1], 8);
                done();
        });
    });


    it('with error & with error data', (done) => {
        cht.clbWaitAll([
                (clb) => {
                    setTimeout( () => { clb(null, 8) }, 1);
                },
                (clb) => {
                    setTimeout( () => { clb( new Error('error'), 42 ) }, 2);
                }
            ],
            (err, data) => {
                expect(err).to.be.an('error');
                assert.equal(data, 42);
                done();
        });
    });


    it('empty array', (done) => {
        cht.clbWaitAll([],
            (err, data) => {
                assert.equal(err, null);
                done();
        });
    });


    it('1 thousand and 24 callbacks', function(done) {
        var l = 1024;
        var fns = [];

        for (var i=0; i<l; i++) {
            fns[i] = (clb) => {
                setTimeout( () => { clb(null, ++i) }, 1);
            }
        }

        i = -1;
        cht.clbWaitAll(fns,
            (err, data) => {
                assert.equal(err, null);

                for (var i=0; i<l; i++) {
                    assert.equal(data[i], i);
                }

                done();
        });
    });
});



describe('clbQueue', function(suite) {
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

        this.timeout(120 * 1024);

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
});