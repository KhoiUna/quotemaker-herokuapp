const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");

router.get("/", redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/home");
    res.clearCookie("session_id");
    res.render("login.ejs", {
      warn: null,
      logout: "* Successfully logged out!",
    });
  });
});

module.exports = router;
