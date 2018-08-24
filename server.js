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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// const todolistRoutes = require("./routes/todolists");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

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
app.use("/api/users", usersRoutes(knex));

// for todolists
// app.use("/api/todolists", todolistRoutes(knex));

// Home page - GET
app.get("/", (req, res) => {
  res.render("index");
});

// Home page - POST
app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.post("/register", (req, res) => {
  console.log("These are the  items", req.body);
  model.createUser(req.body);
  res.redirect("/");
});


app.post("/login", (req, res) => {
  model.createUser(req.body);
  res.redirect("/");
});


app.get("/users/:id", (req, res) => {
  console.log("reached get user edit user routine.")
});

app.get("/users/profile/:id", (req, res) => {
  console.log("reached get user profile edit routine.")
});

app.post("/users/profile/:id", (req, res) => {
  console.log("reached post user profile edit routine.")
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
