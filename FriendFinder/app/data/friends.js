// ===============================================================================
// DATA
// Below data will hold all of the survey results.
// Initially we just set it equal to a "dummy" user.
// But you could have it be an empty array as well.
// ===============================================================================

var surveyResults = [
    {
        name: "Nelson",
        image: "https://vignette.wikia.nocookie.net/simpsons/images/e/e9/Nelson_Ha-Ha.jpg/revision/latest/scale-to-width-down/350?cb=20121205194057",
        scores: [
            5,
            5,
            4,
            1,
            3,
            4,
            5,
            3,
            4,
            4
        ]
    }
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = surveyResults;