const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  findByUsername,
  add,
  update,
  remove
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .first();
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? this.findById(id) : null));
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
