Template.body.helpers({
    quizs: function () {
        return Quiz.find();
    }
});

// Add an index to each item
UI.registerHelper('indexedArray', function (context, options) {
    if (context) {
        return context.map(function (item, index) {
            item._index = index;
            return item;
        });
    }
});

