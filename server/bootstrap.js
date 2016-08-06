//This function will be executed when the app starts
Meteor.startup(function () {

    //If there is no quiz available, it creates one with simple data
    if (Quiz.find().count() === 0) {
        var quizSimple = [
            {
                question: 'Did you like the tutorial?',
                options: [
                    { text: 'Yes, very much!', votes: 0 },
                    { text: 'More or less', votes: 0 },
                    { text: 'No. Prefer JavaScript', votes: 0 }
                ]
            },
            {
                question: 'How do you evalulate this article?',
                options: [
                    { text: 'Bad', votes: 0 },
                    { text: 'Good', votes: 0 },
                    { text: 'Excellent', votes: 0 }
                ]
            }
        ];

        //Iterate over all quiz records and insert each into the database
        _.each(quizSimple, function (quiz) {
            Quiz.insert(quiz);
        });
    }
});