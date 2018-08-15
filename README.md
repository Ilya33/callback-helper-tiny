# callbacks-helper-tiny


callbacks-helper-tiny is a tiny library on Typescript (and JavaScript) which help to wait for multiple callbacks to finish.


## Install

```
npm install callbacks-helper-tiny
```


## Functions

`clbQueue(arrayOfCallbacks, callback)` - call callbacks in `arrayOfCallbacks` one after the other then call `callback`.

`clbWaitAll(arrayOfCallbacks, callback)` - call all callbacks in `arrayOfCallbacks`. When all callbacks are done call `callback`.


## Usage

```js
var cht = require('callbacks-helper-tiny');

// short example
var callbacksQueue = [];

for (var i=0; i<8; i++) {
    callbacksQueue.push(function(clb) {
        ajax(data,
            function() { // success
                clb(null);
            },
            function() { // error
                clb(new Error('ajax error'));
            }
        );
    });
}

cht.clbQueue(callbacksQueue, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('success');
    }
});


// another example
cht.clbQueue([
        function(clb) { // wrapper
            setTimeout( function() { // your callback
                clb(null, 42); // clb( Error, customDataIfNeeded)
            }, 1000);
        },
        function(clb) { // one more
            setTimeout( function() { // your callback
                clb(new Error("Oh!!")); // Error :(
            }, 1000);
        },
        function(clb) {
            setTimeout( function() { // your callback
                clb(null, { key: 'value'});
            }, 1000);
        },
    ],
    function(err, results) { // when all callbacks done or error exists
        if (err) {
            console.log(err);
        }
        else {
            // results from callbacks array if exists
            console.log(results);
        }
});


cht.clbWaitAll([
        function(clb) { // wrapper
            setTimeout( function() { // your callback
                clb(null, 42); // clb( Error, customDataIfNeeded)
            }, 1000);
        },
        function(clb) { // one more
            setTimeout( function() { // your callback
                clb(new Error("Oh!!")); // Error :(
            }, 1000);
        },
        function(clb) {
            setTimeout( function() { // your callback
                clb(null, { key: 'value'});
            }, 1000);
        },
    ],
    function(err, mixedResults) { // when all callbacks done or error exists
        if (err) {
            console.log(err);
        }
        else {
            // unsorted results from callbacks array if exists
            console.log(mixedResults);
        }
});
```


## License

MIT