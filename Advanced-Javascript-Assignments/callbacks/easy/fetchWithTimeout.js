// Problem Description – fetchWithTimeout(url, ms, callback)
//
// You are required to write a function named fetchWithTimeout that accepts a URL,
// a time limit in milliseconds, and a callback function.
// The function attempts to fetch data from the given URL.
// If the request completes within the specified time, the callback is invoked with
// null as the first argument and the fetched data as the second argument.
// If the operation exceeds the time limit, the callback is invoked with an Error
// whose message is "Request Timed Out".


function fetchWithTimeout(url, ms, callback) {
    let finished = false; // flag to track if callback was already called

    // Start the timer
    const timer = setTimeout(function()
     {
        if (!finished) {
            finished = true;
            callback(new Error("Request Timed Out")); // time ran out first
        }
    }, ms);

    // Start the fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!finished) {
                finished = true;
                clearTimeout(timer);      // cancel the timer, no longer needed
                callback(null, data);     // fetch won the race
            }
        })
        .catch(err => {
            if (!finished) {
                finished = true;
                clearTimeout(timer);      // cancel the timer
                callback(err);            // fetch itself failed (network error etc.)
            }
        });
}

module.exports = fetchWithTimeout;
