
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('email');
      table.string('password');
      table.string('nickname');
      table.string('bio');
      
    });
  };
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('todolist', function (table) {
      table.increments();
      table.integer('userid');
      table.string('description');
      table.string('duration');
      table.string('status');
      table.integer('cat_id');
      
      table.foreign('userid').references('id').inTable('users');
      table.foreign('cat_id').references('id').inTable('categories');
    });
  };

  exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function (table) {
      table.increments();
      table.string('name');
      table.string('imageurl');
        
    });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
    return knex.schema.dropTable('categories');
    return knex.schema.dropTable('todolist');
  };
