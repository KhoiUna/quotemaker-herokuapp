const router = require("express").Router();
const pool = require("../db/pool");
const checkLogin = require("../utils/checkLogin");
const redirectMain = require("../middlewares/redirectMain");

router.get("/", redirectMain, (req, res) => {
  res.render("login.ejs", {
    warn: null,
    logout: null,
  });
});

//This route to check if username exists
router.post("/authenticate", redirectMain, async (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  if ((await checkLogin(pool, user, req)) === "Login") {
    res.redirect("/api/main");
  } else {
    res.render("login.ejs", await checkLogin(pool, user));
  }
});

module.exports = router;
