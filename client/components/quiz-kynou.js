Template.quiz.events({
    // click event handler
    'click .vote': function (event) {

        // prevent multiple clicks
        event.preventDefault();

        // retrieve id of parent quiz
        var idQuiz = $(event.currentTarget).parent('.quiz').data('id');
        var idVote = $(event.currentTarget).data('id');

        var voteString = 'options.' + idVote + '.votes';
        var action = {};
        action[voteString] = 1;

        // increment vote counter
        Quiz.update(
            { _id: idQuiz },
            { $inc: action }
        );
    }
});