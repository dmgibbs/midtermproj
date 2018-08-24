"use strict";

const express = require('express');
const router  = express.Router();

function getUser() {
  return 1;
}

module.exports = (knex) => {

   router.get("/", (req, res) =>{
    knex
    .select("*")
    .from("todolist")
    .where('id', getUser())//getUser=1
    .then((results) => {
       res.json(results);
    });
  });

  var checkedValue = $('.checkbox:checked').val();

  router.post("/", (req, res) => {
    knex('todolist')
      .insert({description: description, duration: duration, status: checkedValue, user_id: 1, cat_id: 2 })
      .then(function(rows){
        console.log("Add new to do item", rows);
      });
  });



  return router;


}


