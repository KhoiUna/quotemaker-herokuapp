const router = require("express").Router();
const redirectMain = require("../middlewares/redirectMain");
const passport = require("passport");
const localPassportSetup = require("../config/local-passport-setup");

router.get("/", redirectMain, (req, res) => {
  res.render("login.ejs", {
    logout: null,
  });
});

router.post(
  "/",
  redirectMain,
  passport.authenticate("local", {
    successRedirect: "/api/main",
    failureRedirect: "/api/login",
  })
);

module.exports = router;
