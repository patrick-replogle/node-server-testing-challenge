exports.seed = async knex => {
  await knex("posts").truncate();
  await knex("users").truncate();
};
