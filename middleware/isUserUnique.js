const Users = require("../users/user-model.js");

function isUserUnique(req, res, next) {
  Users.findByUsername(req.body.username).then(user => {
    if (user) {
      res.status(409).json({ message: "username already taken" });
    } else {
      next();
    }
  });
}

module.exports = {
  isUserUnique
};
