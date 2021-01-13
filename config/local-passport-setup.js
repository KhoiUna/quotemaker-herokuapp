const passport = require("passport");
const LocalStrategy = require("passport-local");
const GetUser = require("../utils/GetUser");
const comparePassword = require("../helpers/comparePassword");
const pool = require("../db/pool");

// Configure the local strategy for use by Passport
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await GetUser.byEmail(pool, email);
      if (!user) {
        return done(null, false);
      }
      //
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
