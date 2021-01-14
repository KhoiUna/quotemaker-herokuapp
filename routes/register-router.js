const router = require("express").Router();
const pool = require("../db/pool");
const registerUser = require("../utils/registerUser");
const redirectMain = require("../middlewares/redirectMain");

//Render register.ejs
router.get("/", redirectMain, (req, res) => {
  res.render("register.ejs", {
    usernameInvalid: null,
    notMatch: null,
    success: null,
  });
});

router.post("/", redirectMain, async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  res.render("register", await registerUser(pool, user));
});

module.exports = router;
