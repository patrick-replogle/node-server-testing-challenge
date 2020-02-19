const express = require("express");
const jwt = require("jsonwebtoken");

const Posts = require("./post-model.js");

const router = express.Router();

// get posts for all users
router.get("/all", async (req, res, next) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// get post by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);

    if (id) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The specified post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

// get all posts by user making request
router.get("/", async (req, res, next) => {
  let decoded = jwt.decode(req.headers.authorization);
  const { id } = decoded.user;

  try {
    const posts = await Posts.findUserPosts(id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res
        .status(401)
        .json({ message: "User does not have any posts at this time" });
    }
  } catch (err) {
    next(err);
  }
});

// add post
router.post("/", async (req, res, next) => {
  let decoded = jwt.decode(req.headers.authorization);
  const { id } = decoded.user;

  const payload = {
    text: req.body.text,
    date: req.body.date,
    user_id: id
  };

  try {
    if (!req.body.text) {
      res.status(401).json({ message: "Please include required text field" });
    } else {
      res.status(201).json(await Posts.add(payload));
    }
  } catch (err) {}
});

// update post
router.put("/:id", async (req, res, next) => {
  let decoded = jwt.decode(req.headers.authorization);
  const { id } = decoded.user;

  const payload = {
    text: req.body.text,
    date: req.body.date,
    user_id: id
  };

  try {
    if (!req.body.text) {
      res.status(401).json({ message: "Please include a text field" });
    }
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.json(await Posts.update(req.params.id, payload));
    } else {
      res.status(404).json({ message: "The specified post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

// delete post
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id);
    if (post) {
      res.json(await Posts.remove(id));
    } else {
      res.status(401).json({ message: "The specified post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
