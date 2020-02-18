const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "user1",
      password: bcrypt.hashSync("password", 10),
      administrator: true
    },
    {
      username: "user2",
      password: bcrypt.hashSync("password", 10),
      administrator: false
    }
  ]);
};
