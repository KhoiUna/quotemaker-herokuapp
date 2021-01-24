const router = require("express").Router();
const passport = require("passport");
const redirectMain = require("../middlewares/redirectMain");

router.get(
  "/google",
  redirectMain,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  redirectMain,
  passport.authenticate("google", {
    failureRedirect: "/api/login",
  }),
  redirectMain
);

module.exports = router;
