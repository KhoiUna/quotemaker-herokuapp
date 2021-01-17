const router = require("express").Router();
const pool = require("../db/pool");
const QuoteFunctions = require("../utils/QuoteFunctions");
const redirectLogin = require("../middlewares/redirectLogin");

//Render play.ejs
router.get("/", redirectLogin, (req, res, next) => {
  res.render("play");
});

router.post("/save", redirectLogin, (req, res) => {
  const quote = req.body.quote;
  const color = req.body.color;
  const bgcolor = req.body.bgcolor;
  QuoteFunctions.addQuoteToDb(
    pool,
    req.user.user_id,
    quote,
    color,
    bgcolor,
    res
  );
});

module.exports = router;
