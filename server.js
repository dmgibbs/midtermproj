"use strict";

require('dotenv').config();
const model = require('./model.js');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');



//const http = require('http');
//const request = require('request');
var pos = require('pos');
const pd = require('paralleldots');

// Be sure to set your API key
pd.apiKey = "WsJx3P7cFx5CLT2eLaVrfrh6RhaNFSEYKoKgKrDZcSA";

const category = {
  "movie": [
    "film", "entertainment",
    "play", "concert",
    "cinema"
  ],
  "restaurant": [
    "food", "dinner", "lunch", "breakfast",
    "supper", "meal", "eat"
  ],
  "products": [
    "buy","item", "store", "product", "goods",
    "general", "something"
  ],
  "Books": ["read", "play", "paper", "look", "see", "magazine", "novel"]
}


const stripInput = function() {
  var entry = process.argv.slice(2).join(" ");
  var words = new pos.Lexer().lex(entry);
  var tagger = new pos.Tagger();
  var taggedWords = tagger.tag(words);
  var verbs = [];
  let pushedItems = 0;
  for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    if (tag.includes("VB") || tag.includes("NN")) {
      if (pushedItems < 8) {
        verbs.push(word);
        pushedItems++;
      }
    }
    console.log(word + " /" + tag);
  }

  return verbs.join(" ");
}

const res = stripInput();




// evaluateScores()
//   .then((result) => {
//     data = JSON.parse(result);
//     answer = data['taxonomy'].sort();
//     var value = 0;
//     switch (answer[0].tag) {
//       case "movie":
//         value = 1;
//         break;
//       case "books":
//         value = 2;
//         break;
//       case "restaurant":
//         value = 3;
//         break;
//       case "products":
//         value = 4;
//     }
//     console.log(" Your category selected is: ", answer[0].tag);
//     console.log("which as a category id of :", value)
//   }).catch((error) => {
//     console.log(error);
//   })




// Seperated Routes for each Resource
//const usersRoutes = require("./routes/users");

// const todolistRoutes = require("./routes/todolists");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(cookieSession({
  name: 'session',
  signed: false,

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
//app.use("/api/users", usersRoutes(knex));

// for todolists
// app.use("/api/todolists", todolistRoutes(knex));

// Home page - GET
app.get("/", (req, res) => {
  let templateVars = {
    id: req.session.id
  };
  res.render("index", templateVars);
});

// Register page - POST
app.get("/register", (req, res) => {
  res.render("register");
});


//Login page - GET
app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/profile", (req, res) => {
  res.render("profile");
});


//POST - register page
app.post("/register", (req, res) => {
  console.log("These are the  items", req.body);
  model.createUser(req.body);
  res.redirect("/");
});



//POST - /todo/add - todolist page
app.post("/todo/add", (req, res) => {
  function evaluateScores(description) {
    pd.customClassifier(description, category)
      .then((response) => {
        let evaluationData = JSON.parse(response)
        let answer = evaluationData['taxonomy'].sort();
        console.log("I am inserting this tag",answer[0].tag);
        var value = 0;
        switch (answer[0].tag) {
          case "movie":
            value = 1;
            break;
          case "Books":
            value = 2;
            break;
          case "restaurant":
            value = 3;
            break;
          case "products":
            value = 4;
            break;
        }
        console.log("value of string:", value);
        // knexfunction();
        knex('todolist')
          .insert({ description: req.body.description, duration: req.body.duration, status: req.body.todo, user_id: req.session.id, cat_id: value })
          .then((results) => {
            console.log("req.body", req.body);
            res.redirect("/");

          });
      })
  }

  console.log(req.body, 1);

  function giveDescription() {
    return new Promise((resolve, reject) => {
      resolve(req.body.description);
    })

  };

  giveDescription()
    .then((result) => {
      evaluateScores(result)
      if (! result) {
        return Promise.reject("err");
      }
    }).catch((err) => {
      console.log("err  - 2");
    })


  // evaluateScores()
  //   .then((result) => {
  //     data = JSON.parse(result);
  //     console.log("got to evaluate");


  //   console.log(" Your category selected is: ", answer[0].tag);
  //   console.log("which as a category id of :", value)

  //  //---------------------------------------------------------------------

  // }).catch((error) => {
  //   console.log(error);
  // });

});


//POST - /login
app.post("/login", (req, res) => {
  console.log("req.body is: ", req.body);
  knex
    .select('id', 'email', 'password')
    .from('users')
    .where('email', req.body.email)
    .andWhere('password', req.body.password)
    .then((results) => {
      console.log(results);
      req.session.id = results[0].id;
      console.log("req.session.id ~~~~~~~~", req.session.id);

      res.redirect("/");
    })
});


//GET - get information from todolist
app.get("/todo/list", (req, res) => {
  console.log("get to do list: ", req.session.id);
  knex('todolist')
    .select('description', 'duration', 'status', 'user_id', 'cat_id')
    .where({'user_id': req.session.id })
    .asCallback(function(err, rows) {
      res.send(rows);

    });


});



app.get("/users/:id", (req, res) => {
  console.log("reached get user edit user routine.")
});

// app.get("/users/profile/:id", (req, res) => {
//   console.log("reached get user profile edit routine.")
// });

app.post("/users/:id/edit", (req, res) => {
  console.log("reached post user profile edit routine.")
});

//edit form
app.get("/users/:id/edit", (req, res) => {

});


// Logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
