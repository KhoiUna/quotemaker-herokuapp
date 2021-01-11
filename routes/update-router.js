const router = require("express").Router();
const pool = require("../db/pool");
const QuoteFunctions = require("../utils/QuoteFunctions");
const redirectLogin = require("../middlewares/redirectLogin");

router.get("/:quoteId", redirectLogin, (req, res) => {
  const quoteId = req.params.quoteId;
  QuoteFunctions.renderQuoteForUpdate(pool, quoteId, res);
});

router.post("/:quoteId", redirectLogin, (req, res) => {
  const quoteId = req.params.quoteId;
  const quote = req.body.quote;
  const color = req.body.color;
  const bgcolor = req.body.bgcolor;
  QuoteFunctions.updateQuote(pool, quoteId, quote, color, bgcolor, res);
});

module.exports = router;
