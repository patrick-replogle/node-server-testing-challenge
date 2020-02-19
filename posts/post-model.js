const db = require("../data/dbConfig.js");

function find() {
  return db("posts");
}

function findById(id) {
  return db("posts")
    .where({ id })
    .first();
}

function findUserPosts(id) {
  return db("posts").where("user_id", id);
}

async function add(post) {
  const [id] = await db("posts").insert(post);

  return findById(id);
}

function remove(id) {
  return db("posts")
    .where({ id })
    .del();
}

async function update(id, changes) {
  await db("posts")
    .where({ id })
    .update(changes);

  return findById(id);
}

module.exports = {
  find,
  findById,
  findUserPosts,
  add,
  remove,
  update
};
