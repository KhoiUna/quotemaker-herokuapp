module.exports = {
  async byUsername(pool, username) {
    const client = await pool.connect();
    try {
      const userIdAndPassword = await client.query(
        "SELECT user_id, username, password from users WHERE username = $1",
        [username]
      );
      return userIdAndPassword.rows[0];
    } catch (err) {
      console.log("Error checking user");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },

  async byId(pool, userId) {
    const client = await pool.connect();
    try {
      const userIdAndPassword = await client.query(
        "SELECT user_id, username, password from users WHERE user_id = $1",
        [userId]
      );
      return userIdAndPassword.rows[0];
    } catch (err) {
      console.log("Error checking user");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },
};
