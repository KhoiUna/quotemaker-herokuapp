const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");

router.get("/", redirectLogin, (req, res) => {
  req.logout();
  res.render("login.ejs", {
    warn: null,
    logout: "* Successfully logged out!",
  });
});

module.exports = router;
