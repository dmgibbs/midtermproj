
exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ email: 'Alice@there.com', password: 'aaa' }),
        knex('users').insert({ email: 'Bob@123.com', password: 'aaa' }),
        knex('users').insert({ email: 'Charlie@lostboys.com', password: 'aaa' }),
        knex('users').insert({ email: 'Bob@party.com', password: 'aaa' }),
        knex('users').insert({ email: 'Charlie@lovebooks.com', password: 'aaa' })
      ]);
    })
    .then(function () {
      return knex('categories').del()
        .then(function () {
          return Promise.all([
            knex('categories').insert({name: 'movies' }),
            knex('categories').insert({name: 'books' }),
            knex('categories').insert({name: 'restaurants' }),
            knex('categories').insert({name: 'products' })
          ]);
        })
    })
    .then(function () {
      return knex('todolist').del()
        .then(function () {
          return Promise.all([

            knex('todolist').insert({description: 'La La Land', duration: 30, status: 'doing', user_id: 1, cat_id: 3 }),
            knex('todolist').insert({description: 'Backyards', duration: 20, status: 'todo', user_id: 1, cat_id: 2}),
            knex('todolist').insert({description: 'York Dale', duration: 80, status: 'done', user_id: 3, cat_id: 1 })
          ]);
        })
    })
  }