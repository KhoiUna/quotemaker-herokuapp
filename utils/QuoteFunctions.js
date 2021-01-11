module.exports = {
  async addQuoteToDb(pool, userId, quote, color, bgcolor, res) {
    const client = await pool.connect();
    try {
      await client.query(
        "INSERT INTO quotes (user_id, quote,color,background) VALUES ($1, $2, $3, $4)",
        [userId, quote, color, bgcolor]
      );
      console.log("Quote is added to database!");
      res.redirect("/api/main");
    } catch (err) {
      console.log("Error adding quote to db");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },

  async renderQuoteForUpdate(pool, quoteId, res) {
    const client = await pool.connect();
    try {
      console.log("rendering quotes for updating");
      const results = await client.query(
        "SELECT quote, color, background FROM quotes WHERE quote_id = $1",
        [quoteId]
      );
      const { quote, color, background } = results.rows[0];
      console.log(quote, color, background);
      res.render("play-update.ejs", {
        quoteId: quoteId,
        quote,
        color,
        bgcolor: background,
      });
    } catch (err) {
      console.log("Error rendering quotes for updating");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },

  async updateQuote(pool, quoteId, quote, color, background, res) {
    const client = await pool.connect();
    try {
      await client.query(
        "UPDATE quotes SET quote = $1, color = $2, background = $3 WHERE quote_id = $4",
        [quote, color, background, quoteId],
        (err) => {
          if (err) throw err;
          console.log("Quote is updated to database!");
          res.redirect("/api/main");
        }
      );
    } catch (err) {
      console.log("Error updating quotes");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },

  async deleteQuote(pool, quoteId, res) {
    const client = await pool.connect();
    try {
      await client.query("DELETE FROM quotes WHERE quote_id = $1", [quoteId]);
      console.log("Quote is deleted from database!");
      res.redirect("/api/main");
    } catch (err) {
      console.log("Error deleting quotes");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },
};
