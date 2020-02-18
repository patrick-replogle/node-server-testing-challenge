exports.up = async knex => {
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    tbl.string("password", 250).notNullable();
    tbl
      .boolean("administrator")
      .notNullable()
      .defaultTo(false);
  });

  await knex.schema.createTable("posts", tbl => {
    tbl.increments("id");
    tbl.text("text").notNullable();
    tbl.string("date");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("posts");
  await knex.schema.dropTableIfExists("users");
};
