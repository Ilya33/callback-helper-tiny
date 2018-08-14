# callback-helper-tiny


callback-helper-tiny is a tiny library on Typescript (and JavaScript) which help to wait for multiple callbacks to finish.


## Usage

```js
var cht = require('callback-helper-tiny');

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
```


## License

MIT