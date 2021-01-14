const router = require("express").Router();
const passport = require("passport");
const googlePassportSetup = require("../config/google-passport-setup");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/api/login",
    successRedirect: "/api/main",
  })
);

module.exports = router;
