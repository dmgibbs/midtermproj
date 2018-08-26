"use strict";

require('dotenv').config();
const model = require('./model.js');

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');

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
  id : req.session.id
};
  res.render("index",templateVars);
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
app.post("/todo/add", (req,res) => {
  console.log("req.session.id00000",req.session.id);
  knex('todolist')
    .insert({description: req.body.description, duration: req.body.duration, status: req.body.todo, user_id: req.session.id, cat_id: 3})
    .then((results) => {
    console.log("req.body",req.body);
     res.redirect("/");
    });
});


//POST - /login
app.post("/login", (req, res) => {
  console.log("req.body is: ", req.body);
   knex
    .select('id','email','password')
    .from('users')
    .where('email',req.body.email )
    .andWhere( 'password', req.body.password)
    .then((results) =>{
      console.log(results);
     req.session.id = results[0].id;
     console.log("req.session.id ~~~~~~~~",req.session.id);

      res.redirect("/");
      })
});


//GET - get information from todolist
app.get("/todo/list", (req, res) => {
  console.log("get to do list: ",req.session.id);
   knex('todolist')
  .select('description','duration','status','user_id','cat_id')
  .where({'user_id': req.session.id})
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
app.get("/users/:id/edit", (req,res) => {

});


// Logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
