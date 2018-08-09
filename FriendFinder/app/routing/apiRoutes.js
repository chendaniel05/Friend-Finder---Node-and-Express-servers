// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey... this data is then sent to the server...
    // Then the server saves the data to the surveyResults array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        // saves off object to be added to api, with all responses
        let newFriend = req.body;
        console.log(newFriend);

        // Saves off scores portion of responses
        let answers = newFriend.scores;

        // Establishes variables for matching friend
        let friendName = "";
        let friendImg = "";

        // Establishes a value that the resulting sum will always be less than, to get into if statement
        let total = 500;

        for (let i = 0; i < friends.length; i++) {
            let diff = 0;
            // New array with the difference values
            let difference = [];

            for (let j = 0; j < answers.length; j++) {
                // Takes absolute value of differences
                let diff = Math.abs(answers[j] - friends[i].scores[j]);
                // Pushes difference to new array
                difference.push(diff);
            }
            console.log(difference);

            // Adds up the sum of all values in the difference array
            let sum = difference.reduce(function (acc, val) { return acc + val; });
            console.log("sum is " + sum)

            // Checks each friend against a total, and the lowest total difference will be the resulting friend
            if (sum < total) {
                // Establishes the new total difference to beat
                total = sum;
                // Resets the sum each loop
                sum = 0;
                friendName = friends[i].name;
                friendImg = friends[i].image;
            } else {
                sum = 0;
            }
        }
        // Adds new user to API
        friends.push(newFriend);

        // Push results back for HTML page to use
        res.json({
            friendName: friendName,
            friendImg: friendImg
        });
    });
};