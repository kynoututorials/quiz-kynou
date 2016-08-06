var require = meteorInstall({"client":{"components":{"template.quiz-kynou-form.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/components/template.quiz-kynou-form.js                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("formQuiz");                                                                                  // 2
Template["formQuiz"] = new Template("Template.formQuiz", (function() {                                             // 3
  var view = this;                                                                                                 // 4
  return HTML.Raw('<form>\n        <div class="question-group">\n            <label>Question</label>\n            <input type="text" name="question" class="form-control" placeholder="Your Question">\n        </div>\n\n        <div class="form-group">\n            <label>Option #1</label>\n            <input type="text" name="option1" class="form-control" placeholder="Option #1">\n        </div>\n        <div class="form-group">\n            <label>Option #2</label>\n            <input type="text" name="option2" class="form-control" placeholder="Option #2">\n        </div>\n        <div class="form-group">\n            <label>Option #3</label>\n            <input type="text" name="option3" class="form-control" placeholder="Option #3">\n        </div>\n\n        <button type="submit" class="btn btn-lg btn-primary btn-block">Create Quiz</button>\n    </form>');
}));                                                                                                               // 6
                                                                                                                   // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.quiz-kynou.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/components/template.quiz-kynou.js                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("quiz");                                                                                      // 2
Template["quiz"] = new Template("Template.quiz", (function() {                                                     // 3
  var view = this;                                                                                                 // 4
  return HTML.DIV({                                                                                                // 5
    "class": "quiz well well-lg",                                                                                  // 6
    "data-id": function() {                                                                                        // 7
      return Spacebars.mustache(view.lookup("_id"));                                                               // 8
    }                                                                                                              // 9
  }, "\n\n        ", HTML.H3(Blaze.View("lookup:question", function() {                                            // 10
    return Spacebars.mustache(view.lookup("question"));                                                            // 11
  })), "\n\n        ", Blaze.Each(function() {                                                                     // 12
    return Spacebars.dataMustache(view.lookup("indexedArray"), view.lookup("options"));                            // 13
  }, function() {                                                                                                  // 14
    return [ "\n        ", HTML.A({                                                                                // 15
      href: "#",                                                                                                   // 16
      "class": "vote btn btn-primary btn-block",                                                                   // 17
      "data-id": function() {                                                                                      // 18
        return Spacebars.mustache(view.lookup("_index"));                                                          // 19
      }                                                                                                            // 20
    }, "\n            ", HTML.SPAN({                                                                               // 21
      "class": "votes pull-right"                                                                                  // 22
    }, Blaze.View("lookup:votes", function() {                                                                     // 23
      return Spacebars.mustache(view.lookup("votes"));                                                             // 24
    })), "\n            ", HTML.SPAN({                                                                             // 25
      "class": "text"                                                                                              // 26
    }, Blaze.View("lookup:text", function() {                                                                      // 27
      return Spacebars.mustache(view.lookup("text"));                                                              // 28
    })), "\n        "), "\n        " ];                                                                            // 29
  }), "\n    ");                                                                                                   // 30
}));                                                                                                               // 31
                                                                                                                   // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"quiz-kynou-form.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/components/quiz-kynou-form.js                                                                            //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.formQuiz.events({                                                                                         // 1
    // executed when form is submitted                                                                             //
    'submit form': function () {                                                                                   // 3
        function submitForm(event) {                                                                               // 3
                                                                                                                   //
            // Prevent multiple submits                                                                            //
            event.preventDefault();                                                                                // 6
                                                                                                                   //
            // Retrieve data from the form                                                                         //
            var newQuiz = {                                                                                        // 9
                question: event.target.question.value,                                                             // 10
                options: [{ text: event.target.option1.value, votes: 0 }, { text: event.target.option2.value, votes: 0 }, { text: event.target.option3.value, votes: 0 }]
            };                                                                                                     // 9
                                                                                                                   //
            // Creates a new quiz                                                                                  //
            Quiz.insert(newQuiz);                                                                                  // 19
        }                                                                                                          // 20
                                                                                                                   //
        return submitForm;                                                                                         // 3
    }()                                                                                                            // 3
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"quiz-kynou.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/components/quiz-kynou.js                                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.quiz.events({                                                                                             // 1
        // click event handler                                                                                     //
        'click .vote': function () {                                                                               // 3
                function clickVote(event) {                                                                        // 3
                                                                                                                   //
                        // prevent multiple clicks                                                                 //
                        event.preventDefault();                                                                    // 6
                                                                                                                   //
                        // retrieve id of parent quiz                                                              //
                        var idQuiz = $(event.currentTarget).parent('.quiz').data('id');                            // 9
                        var idVote = $(event.currentTarget).data('id');                                            // 10
                                                                                                                   //
                        var voteString = 'options.' + idVote + '.votes';                                           // 12
                        var action = {};                                                                           // 13
                        action[voteString] = 1;                                                                    // 14
                                                                                                                   //
                        // increment vote counter                                                                  //
                        Quiz.update({ _id: idQuiz }, { $inc: action });                                            // 17
                }                                                                                                  // 21
                                                                                                                   //
                return clickVote;                                                                                  // 3
        }()                                                                                                        // 3
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.app.body.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/template.app.body.js                                                                                     //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.body.addContent((function() {                                                                             // 2
  var view = this;                                                                                                 // 3
  return [ HTML.DIV({                                                                                              // 4
    "class": "container"                                                                                           // 5
  }, "\n        ", HTML.DIV({                                                                                      // 6
    "class": "row"                                                                                                 // 7
  }, "\n            ", HTML.DIV({                                                                                  // 8
    "class": "col-md-6 col-md-offset-3"                                                                            // 9
  }, "\n                ", Spacebars.include(view.lookupTemplate("login")), "\n                ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));                                                             // 11
  }, function() {                                                                                                  // 12
    return [ "\n                    ", Spacebars.include(view.lookupTemplate("formQuiz")), "\n                " ];
  }), "\n            "), "\n        "), "\n    "), "\n\n    ", Blaze.If(function() {                               // 14
    return Spacebars.call(view.lookup("currentUser"));                                                             // 15
  }, function() {                                                                                                  // 16
    return [ "\n        ", HTML.DIV({                                                                              // 17
      "class": "quiz"                                                                                              // 18
    }, "\n            ", Blaze.Each(function() {                                                                   // 19
      return Spacebars.call(view.lookup("quizs"));                                                                 // 20
    }, function() {                                                                                                // 21
      return [ " ", Spacebars.include(view.lookupTemplate("quiz")), " " ];                                         // 22
    }), "\n        "), "\n    " ];                                                                                 // 23
  }) ];                                                                                                            // 24
}));                                                                                                               // 25
Meteor.startup(Template.body.renderToDocument);                                                                    // 26
                                                                                                                   // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.login.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/template.login.js                                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("login");                                                                                     // 2
Template["login"] = new Template("Template.login", (function() {                                                   // 3
  var view = this;                                                                                                 // 4
  return Blaze.If(function() {                                                                                     // 5
    return Spacebars.call(view.lookup("currentUser"));                                                             // 6
  }, function() {                                                                                                  // 7
    return [ "\n        ", Blaze.View("lookup:currentUser.services.facebook.name", function() {                    // 8
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "services", "facebook", "name"));        // 9
    }), " -\n        ", Blaze.View("lookup:currentUser.services.facebook.gender", function() {                     // 10
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "services", "facebook", "gender"));      // 11
    }), "\n        ", HTML.BUTTON({                                                                                // 12
      id: "logout",                                                                                                // 13
      "class": "btn btn-lg btn-primary btn-danger"                                                                 // 14
    }, "Logout"), "\n    " ];                                                                                      // 15
  }, function() {                                                                                                  // 16
    return [ "\n        ", HTML.BUTTON({                                                                           // 17
      id: "facebook-login",                                                                                        // 18
      "class": "btn btn-lg btn-primary btn-block"                                                                  // 19
    }, " Login with Facebook"), "\n    " ];                                                                        // 20
  });                                                                                                              // 21
}));                                                                                                               // 22
                                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"app.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/app.js                                                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.body.helpers({                                                                                            // 1
    quizs: function () {                                                                                           // 2
        function quizs() {                                                                                         // 2
            return Quiz.find();                                                                                    // 3
        }                                                                                                          // 4
                                                                                                                   //
        return quizs;                                                                                              // 2
    }()                                                                                                            // 2
});                                                                                                                // 1
                                                                                                                   //
// Add an index to each item                                                                                       //
UI.registerHelper('indexedArray', function (context, options) {                                                    // 8
    if (context) {                                                                                                 // 9
        return context.map(function (item, index) {                                                                // 10
            item._index = index;                                                                                   // 11
            return item;                                                                                           // 12
        });                                                                                                        // 13
    }                                                                                                              // 14
});                                                                                                                // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/login.js                                                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.login.events({                                                                                            // 1
    'click #facebook-login': function () {                                                                         // 2
        function clickFacebookLogin(event) {                                                                       // 2
            Meteor.loginWithFacebook({}, function (err) {                                                          // 3
                if (err) {                                                                                         // 4
                    throw new Meteor.Error("Login with Facebook failed");                                          // 5
                }                                                                                                  // 6
            });                                                                                                    // 7
        }                                                                                                          // 8
                                                                                                                   //
        return clickFacebookLogin;                                                                                 // 2
    }(),                                                                                                           // 2
                                                                                                                   //
    'click #logout': function () {                                                                                 // 10
        function clickLogout(event) {                                                                              // 10
            Meteor.logout(function (err) {                                                                         // 11
                if (err) {                                                                                         // 12
                    throw new Meteor.Error("Logout failed");                                                       // 13
                }                                                                                                  // 14
            });                                                                                                    // 15
        }                                                                                                          // 16
                                                                                                                   //
        return clickLogout;                                                                                        // 10
    }()                                                                                                            // 10
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"quiz.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// collections/quiz.js                                                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Quiz = new Mongo.Collection('quiz');                                                                               // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/components/template.quiz-kynou-form.js");
require("./client/components/template.quiz-kynou.js");
require("./client/template.app.body.js");
require("./client/template.login.js");
require("./client/components/quiz-kynou-form.js");
require("./client/components/quiz-kynou.js");
require("./client/app.js");
require("./client/login.js");
require("./collections/quiz.js");