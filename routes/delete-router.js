const router = require("express").Router();
const pool = require("../db/pool");
const QuoteFunctions = require("../utils/QuoteFunctions");
const redirectLogin = require("../middlewares/redirectLogin");

router.get("/:quoteId", redirectLogin, (req, res) => {
  const quoteId = req.params.quoteId;
  QuoteFunctions.deleteQuote(pool, quoteId, res);
});

module.exports = router;
