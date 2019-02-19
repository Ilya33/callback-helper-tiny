import {expect} from 'chai';

import {
    CbErrorOnly, CbWithOptionalData,
    cbWaitAll, cbQueue,
    cbWaitAllWithData, cbQueueWithData
} from '../lib/callbacksHelperTiny';



const MAX_CLB_WAIT_TIME = 240;



describe('cbWaitAll', function() {
    it('empty array 0', (done) => {
        cbWaitAll([], (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });

    it('empty array 1', (done) => {
        let error: Error | null = new Error('test error');
        cbWaitAll([], (err) => {
                error = err;
        });

        expect(error).to.be.a('null');
        done();
    });


    it('with error', (done) => {
        cbWaitAll([
                (cb) => {
                    setTimeout( () => { cb(null) }, 1);
                },
                (cb) => {
                    setTimeout( () => { cb( new Error('test error') ) }, 10);
                },
                (cb) => {
                    setTimeout( () => { cb(null) }, 20);
                }
            ],
            (err) => {
                expect(err).to.be.an('error');
                done();
        });
    });


    it('without error', (done) => {
        cbWaitAll([
                (cb) => {
                    setTimeout( () => { cb(null) }, 1);
                },
                (cb) => {
                    setTimeout( () => { cb(null) }, 1);
                }
            ],
            (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });


    it('1 thousand and 24 callbacks', function(done) {
        const l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        let fns = [];

        for (let i: number = 0; i<l; ++i) {
            fns[i] = (cb: CbErrorOnly) => {
                setTimeout( () => { cb(null) }, Math.floor(Math.random() * 4) );
            }
        }

        cbWaitAll(fns, (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });
});



describe('cbWaitAllWithData', function() {
    it('empty array 0', (done) => {
        cbWaitAllWithData([], (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });

    it('empty array 1', (done) => {
        let error: Error | null = new Error('test error');
        cbWaitAllWithData([], (err) => {
                error = err;
        });

        expect(error).to.be.a('null');
        done();
    });


    it('with error', (done) => {
        cbWaitAllWithData([
                (cb) => {
                    setTimeout( () => { cb(null, 1) }, 1);
                },
                (cb) => {
                    setTimeout( () => { cb( new Error('test error') ) }, 10);
                },
                (cb) => {
                    setTimeout( () => { cb(null, 2) }, 20);
                }
            ],
            (err) => {
                expect(err).to.be.an('error');
                done();
        });
    });


    it('without error', (done) => {
        cbWaitAllWithData([
                (cb) => {
                    setTimeout( () => { cb(null, 1) }, 20);
                },
                (cb) => {
                    setTimeout( () => { cb(null, '2') }, 120);
                },
                (cb) => {
                    setTimeout( () => { cb(null, 4) }, 1);
                }
            ],
            (err, data) => {
                expect(err).to.be.a('null');
                expect(data).to.be.an('array').that.eql([1, '2', 4]);
                done();
        });
    });


    it('1 thousand and 24 callbacks', function(done) {
        const l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        let fns = [];

        for (let i: number = 0; i<l; ++i) {
            fns[i] = (cb: CbWithOptionalData) => {
                setTimeout( () => { cb(null, i) }, Math.floor(Math.random() * 4) );
            }
        }

        cbWaitAllWithData(fns, (err, data) => {
                expect(err).to.be.a('null');

                let i: number = 0;
                expect(data).to.be.an('array').that.eql(
                    (<any>Array(l)).fill(0).map(() => {
                        return i++;
                    })
                );
                done();
        });
    });
});



describe('cbQueue', function() {
    it('empty array 0', (done) => {
        cbQueue([], (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });

    it('empty array 1', (done) => {
        let error: Error | null = new Error('test error');
        cbQueue([], (err) => {
                error = err;
        });

        expect(error).to.be.a('null');
        done();
    });


    it('with error', (done) => {
        cbQueue([
                (cb) => {
                    setTimeout( () => { cb(null) }, 1);
                },
                (cb) => {
                    setTimeout( () => { cb( new Error('test error') ) }, 10);
                },
                (cb) => {
                    setTimeout( () => { cb(null) }, 20);
                }
            ],
            (err) => {
                expect(err).to.be.an('error');
                done();
        });
    });


    it('without error', (done) => {
        cbQueue([
                (cb) => {
                    setTimeout( () => { cb(null) }, 1);
                },
                (cb) => {
                    setTimeout( () => { cb(null) }, 1);
                }
            ],
            (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });


    it('1 thousand and 24 callbacks', function(done) {
        const l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        let fns = [];

        for (let i: number = 0; i<l; ++i) {
            fns[i] = (clb: CbErrorOnly) => {
                setTimeout( () => { clb(null) }, Math.floor(Math.random() * 4) );
            }
        }

        cbQueue(fns, (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });
});



describe('cbQueueWithData', function() {
    it('empty array 0', (done) => {
        cbQueueWithData([], (err) => {
                expect(err).to.be.a('null');
                done();
        });
    });

    it('empty array 1', (done) => {
        let error: Error | null = new Error('test error');
        cbQueueWithData([], (err) => {
                error = err;
        });

        expect(error).to.be.a('null');
        done();
    });


    it('with error', (done) => {
        cbQueueWithData([
                (cb) => {
                    setTimeout( () => { cb(null, 1) }, 1);
                },
                (cb) => {
                    setTimeout( () => { cb( new Error('test error') ) }, 10);
                },
                (cb) => {
                    setTimeout( () => { cb(null, 2) }, 20);
                }
            ],
            (err) => {
                expect(err).to.be.an('error');
                done();
        });
    });


    it('without error', (done) => {
        cbQueueWithData([
                (cb) => {
                    setTimeout( () => { cb(null, 1) }, 20);
                },
                (cb) => {
                    setTimeout( () => { cb(null, '2') }, 120);
                },
                (cb) => {
                    setTimeout( () => { cb(null, 4) }, 1);
                }
            ],
            (err, data) => {
                expect(err).to.be.a('null');
                expect(data).to.be.an('array').that.eql([1, '2', 4]);
                done();
        });
    });


    it('1 thousand and 24 callbacks', function(done) {
        const l = 1024;
        this.timeout(MAX_CLB_WAIT_TIME * l);
        let fns = [];

        for (let i: number = 0; i<l; ++i) {
            fns[i] = (clb: CbWithOptionalData) => {
                setTimeout( () => { clb(null, i) }, Math.floor(Math.random() * 4) );
            }
        }

        cbQueueWithData(fns, (err, data) => {
                expect(err).to.be.a('null');

                let i: number = 0;
                expect(data).to.be.an('array').that.eql(
                    (<any>Array(l)).fill(0).map(() => {
                        return i++;
                    })
                );
                done();
        });
    });
});