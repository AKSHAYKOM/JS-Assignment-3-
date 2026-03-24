// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) 
{
    let hasRun = false;   

    let savedErr = null; 
    let savedData = null; 

    return function(...args) {
        const callback = args.pop(); 

        if (hasRun)
     {
            callback(savedErr, savedData);
            return;
        }

        
        fn(...args, function(err, data) 
        {
            hasRun = true;       
            savedErr = err;     
            savedData = data;   
            callback(err, data); 
        });
    };
}
module.exports = once;
