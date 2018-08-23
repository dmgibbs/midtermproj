
exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: 1, email: 'Alice@there.com', password: 'aaa' }),
        knex('users').insert({ id: 2, email: 'Bob@123.com', password: 'aaa' }),
        knex('users').insert({ id: 3, email: 'Charlie@lostboys.com', password: 'aaa' }),
        knex('users').insert({ id: 5, email: 'Bob@party.com', password: 'aaa' }),
        knex('users').insert({ id: 12, email: 'Charlie@lovebooks.com', password: 'aaa' })
      ]);
    })
    .then(function () {
      return knex('categories').del()
        .then(function () {
          return Promise.all([
            knex('categories').insert({ id: 3, name: 'movies' }),
            knex('categories').insert({ id: 6, name: 'books' }),
            knex('categories').insert({ id: 9, name: 'restaurants' })
          ]);
        })
    })
    .then(function () {
      return knex('todolist').del()
        .then(function () {
          return Promise.all([

            knex('todolist').insert({ id: 1, description: 'La La Land', duration: 30, status: 'doing', user_id: 1, cat_id: 3 }),
            knex('todolist').insert({ id: 2, description: 'Backyards', duration: 20, status: 'todo', user_id: 12, cat_id: 6 }),
            knex('todolist').insert({ id: 3, description: 'York Dale', duration: 80, status: 'done', user_id: 5, cat_id: 9 })
          ]);
        })
    })
  }