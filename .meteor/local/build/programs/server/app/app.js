var require = meteorInstall({"collections":{"quiz.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// collections/quiz.js                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Quiz = new Mongo.Collection('quiz');                                                                          // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"bootstrap.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/bootstrap.js                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
//This function will be executed when the app starts                                                          //
Meteor.startup(function () {                                                                                  // 2
                                                                                                              //
    //If there is no quiz available, it creates one with simple data                                          //
    if (Quiz.find().count() === 0) {                                                                          // 5
        var quizSimple = [{                                                                                   // 6
            question: 'Did you like the tutorial?',                                                           // 8
            options: [{ text: 'Yes, very much!', votes: 0 }, { text: 'More or less', votes: 0 }, { text: 'No. Prefer JavaScript', votes: 0 }]
        }, {                                                                                                  // 7
            question: 'How do you evalulate this article?',                                                   // 16
            options: [{ text: 'Bad', votes: 0 }, { text: 'Good', votes: 0 }, { text: 'Excellent', votes: 0 }]
        }];                                                                                                   // 15
                                                                                                              //
        //Iterate over all quiz records and insert each into the database                                     //
        _.each(quizSimple, function (quiz) {                                                                  // 26
            Quiz.insert(quiz);                                                                                // 27
        });                                                                                                   // 28
    }                                                                                                         // 29
});                                                                                                           // 30
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"social-config.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/social-config.js                                                                                    //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
ServiceConfiguration.configurations.remove({                                                                  // 1
    service: 'facebook'                                                                                       // 2
});                                                                                                           // 1
ServiceConfiguration.configurations.insert({                                                                  // 4
    service: 'facebook',                                                                                      // 5
    appId: '932088886917118',                                                                                 // 6
    secret: 'c7395ebdb64ed35153bfdcfce1aa4db0'                                                                // 7
});                                                                                                           // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./collections/quiz.js");
require("./server/bootstrap.js");
require("./server/social-config.js");
//# sourceMappingURL=app.js.map
