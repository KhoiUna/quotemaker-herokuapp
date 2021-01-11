const router = require("express").Router();
const pool = require("../db/pool");
const redirectMain = require("../middlewares/redirectMain");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GetUser = require("../utils/GetUser");
const comparePassword = require("../helpers/comparePassword");

// Configure the local strategy for use by Passport
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      const user = await GetUser.byUsername(pool, username);
      if (!user) {
        return done(null, false);
      }

      try {
        if (await comparePassword(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
// Configure Passport authenticated session persistence
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
passport.deserializeUser(async (user_id, done) => {
  return done(null, await GetUser.byId(pool, user_id));
});
//
//
router.get("/", redirectMain, (req, res) => {
  res.render("login.ejs", {
    warn: null,
    logout: null,
  });
});

router.post(
  "/authenticate",
  redirectMain,
  passport.authenticate("local", {
    successRedirect: "/api/main",
    failureRedirect: "/api/login",
  })
);

module.exports = router;
