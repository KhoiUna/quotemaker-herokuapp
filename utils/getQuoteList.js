const getQuoteList = async (pool, userId) => {
  const client = await pool.connect();
  try {
    const quotes = await client.query(
      "SELECT quote_id, quote, color, background FROM quotes WHERE user_id = $1",
      [userId]
    );
    return quotes.rows;
  } catch (err) {
    console.log("Error getting quotes");
    console.log(err);
    return null;
  } finally {
    client.release();
  }
};

module.exports = getQuoteList;
