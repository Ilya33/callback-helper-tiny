'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var cht = require('../dist/callbackHelperTiny.js');



describe('clbWaitAll', () => {
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
});



describe('clbQueue', () => {
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
});