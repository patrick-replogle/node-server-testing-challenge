const Users = require("../users/user-model.js");

module.exports = {
  validateUserFields
};

function validateUserFields(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Missing required username and password fields"
    });
  } else {
    next();
  }
}
