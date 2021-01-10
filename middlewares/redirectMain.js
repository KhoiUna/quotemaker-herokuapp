module.exports = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/api/main");
  } else {
    next();
  }
};
