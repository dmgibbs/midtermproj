require('dotenv').config();
// const model = require('./model.js');

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
//const cookieSession = require('cookie-session');

const createUser = (body) => {
    knex('users')
    .insert({email:body.email, password: body.password, nickname: body.nickname})
    .then((results) => {
     return true;
    });

    }


// const cb = (data) => {
//   console.log("data is :" , data);
//   req.session.id = data[0].id;

// }

// const doLogin = (body) => {

//     knex
//     .select('id','email','password')
//     .from('users')
//     .where('email',body.email )
//     .andWhere( 'password', body.password)
//     .then((results) => cb(results));

//      //console.log("results are : " ,results);

//      // return true;

//     }


const showHomePage = (body) => {
    knex('users')
    .insert({email:body.email, password: body.password})
    .then((results) => {
      return true;
    });

    }




const getToDoList = (id) => {
    return (resolve, reject) => {
        knex('todolist')
        .select('description','duration')
        .where({'user_id':id})
        .then((results) => {
            console.log("results object from model: ",results);
            let newArray = [];
            for (var i = 0; i < results.length; i++) {
               // newArray.push()
               console.log("results has: ", results[i]['anonymous']);
            }
            resolve(results);


        });
    }
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
    getToDoList: getToDoList,
    createUserStub
}