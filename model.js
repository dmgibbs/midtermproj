require('dotenv').config();
const model = require('./model.js');

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const createUser = (params) => {
    knex('users')
    .insert({name:params.username, password: params.passwd})
    .then((results) => {
      return true;
    });
    
    }
const createUserStub = () => true

const createItem = () => {}
const createItemStub = () => true

const getAllItems = () => {}
const getAllItemsStub = () => ({
    a: 1
})

module.exports = {
    createUser: createUser,
    createUserStub
}