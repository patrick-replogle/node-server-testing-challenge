function administrator(req, res, next) {
  if (req.user && req.user.administrator) {
    next();
  } else {
    res.status(403).json({
      message: "Must be in a department to access student list"
    });
  }
}

module.exports = {
  administrator
};
