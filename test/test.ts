import {expect} from 'chai';

import {
    ClbWithOptionalData,
    clbWaitAll, clbQueue
} from '../lib/callbacksHelperTiny';



describe('clbWaitAll', function() {
    it('empty array 0', (done) => {
        clbWaitAll([], (err, data) => {
                expect(err).to.be.a('null');
                done();
        });
    });

    it('empty array 1', (done) => {
        let error: Error | null = new Error('test error');
        clbWaitAll([], (err, data) => {
                error = err;
        });

        expect(error).to.be.a('null');
        done();
    });


    it('with error', (done) => {
        clbWaitAll([
                (clb) => {
                    setTimeout( () => { clb(null) }, 1);
                },
                (clb) => {
                    setTimeout( () => { clb(null, 2) }, 1);
                },
                (clb) => {
                    setTimeout( () => { clb( new Error('test error') ) }, 20);
                }
            ],
            (err) => {
                expect(err).to.be.an('error');
                done();
        });
    });


    it('without data', (done) => {
        clbWaitAll([
                (clb) => {
                    setTimeout( () => { clb(null) }, 1);
                },
                (clb) => {
                    setTimeout( () => { clb(null) }, 1);
                }
            ],
            (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });


    it('with data', (done) => {
        clbWaitAll([
                (clb) => {
                    setTimeout( () => { clb(null, '42') }, 20);
                },
                (clb) => {
                    setTimeout( () => { clb(null, 8) }, 1);
                }
            ],
            (err, unsortedData) => {
                expect(err).to.be.a('null');
                expect(unsortedData).to.be.an('array');
                unsortedData.sort();
                expect(unsortedData).to.be.an('array').that.eql(['42', 8]);
                done();
        });
    });


    it('1 thousand and 24 callbacks', (done) => {
        const l = 1024;
        let fns = [];

        for (let i: number = 0; i<l; ++i) {
            fns[i] = (clb: ClbWithOptionalData) => {
                setTimeout( () => { clb(null, i) }, Math.floor(Math.random() * 4) );
            }
        }

        clbWaitAll(fns, (err, unsortedData) => {
                expect(err).to.be.a('null');
                unsortedData.sort((a, b) => {return a > b ?1 :-1});

                let i: number = 0;
                expect(unsortedData).to.be.an('array').that.eql(
                    (<any>Array(l)).fill(0).map(() => {
                        return i++;
                    })
                );
                done();
        });
    });
});



describe('clbQueue', function() {
    const suite = this;


    it('empty array 0', (done) => {
        clbQueue([], (err, data) => {
                expect(err).to.be.a('null');
                done();
        });
    });

    it('empty array 1', (done) => {
        let error: Error | null = new Error('test error');
        clbQueue([], (err, data) => {
                error = err;
        });

        expect(error).to.be.a('null');
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