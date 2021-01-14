const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GetUser = require("../utils/GetUser");
const registerUser = require("../utils/registerUser");
const pool = require("../db/pool");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/redirect",
      // callbackURL: "https://khoiquotemaker.herokuapp.com/auth/google/redirect",
    },
    async (accessToken, refreshToken, userData, done) => {
      const user = await GetUser.byEmail(pool, userData.email);
      if (user) {
        return done(null, user);
      }
      //
      try {
        const newUser = {
          username: userData.displayName,
          email: userData._json.email,
          avatar: userData._json.picture,
          googleId: userData.id,
        };
        await registerUser(pool, newUser, "google");
        const currentUser = await GetUser.byEmail(pool, newUser.email);
        return done(null, currentUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);
