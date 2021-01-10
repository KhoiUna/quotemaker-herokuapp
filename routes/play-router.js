const router = require("express").Router();
const pool = require("../db/pool");
const QuoteFunctions = require("../utils/QuoteFunctions");
const redirectLogin = require("../middlewares/redirectLogin");

//Render play.ejs
router.get("/", redirectLogin, (req, res, next) => {
  res.render("play.ejs");
  next();
});

router.post("/save", redirectLogin, (req, res) => {
  const quote = req.body.quote;
  const color = req.body.color;
  const bgcolor = req.body.bgcolor;
  QuoteFunctions.addQuoteToDb(
    pool,
    req.session.user.userId,
    quote,
    color,
    bgcolor,
    res
  );
});

//Update quote route
router.get("/update/:quoteId", redirectLogin, (req, res) => {
  const quoteId = req.params.quoteId;
  QuoteFunctions.renderQuoteForUpdate(pool, quoteId, res);
});

router.post("/update/:quoteId", redirectLogin, (req, res) => {
  const quoteId = req.params.quoteId;
  const quote = req.body.quote;
  const color = req.body.color;
  const bgcolor = req.body.bgcolor;
  QuoteFunctions.updateQuote(pool, quoteId, quote, color, bgcolor, res);
});

//Delete quote route
router.get("/delete/:quoteId", redirectLogin, (req, res) => {
  const quoteId = req.params.quoteId;
  QuoteFunctions.deleteQuote(pool, quoteId, res);
});

module.exports = router;
