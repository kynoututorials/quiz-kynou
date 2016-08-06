Template.formQuiz.events({
    // executed when form is submitted
    'submit form': function (event) {

        // Prevent multiple submits
        event.preventDefault();

        // Retrieve data from the form
        var newQuiz = {
            question: event.target.question.value,
            options: [
                { text: event.target.option1.value, votes: 0 },
                { text: event.target.option2.value, votes: 0 },
                { text: event.target.option3.value, votes: 0 }
            ]
        };

        // Creates a new quiz
        Quiz.insert(newQuiz);
    }
});