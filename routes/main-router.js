const router = require("express").Router();
const pool = require("../db/pool");
const getQuoteList = require("../utils/getQuoteList");
const redirectLogin = require("../middlewares/redirectLogin");

//Render main.ejs
router.get("/", redirectLogin, async (req, res) => {
  console.log("Render main.ejs!");
  const quoteList = await getQuoteList(pool, req.user.user_id);
  res.render("main", {
    username: req.user.username,
    quoteList: quoteList,
    color: null,
    avatar: req.user.avatar,
  });
});

module.exports = router;
