
exports.up = function(knex, Promise) {
    return knex.schema.createTable('todolist', function (table) {
      table.increments('id');
      table.string('description');
      table.integer('duration');
      table.string('status');
      table.integer('user_id');
      table.integer('cat_id');
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('cat_id').references('id').inTable('categories');
    });
   };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todolist');

};
