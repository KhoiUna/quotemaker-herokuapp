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
      console.log("Error getting user by username");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },

  async byEmail(pool, email) {
    const client = await pool.connect();
    try {
      const userIdAndPassword = await client.query(
        "SELECT user_id, username, password from users WHERE email = $1",
        [email]
      );
      return userIdAndPassword.rows[0];
    } catch (err) {
      console.log("Error getting user by email");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },

  async byId(pool, userId) {
    const client = await pool.connect();
    try {
      const id = await client.query(
        "SELECT user_id, username, email, avatar from users WHERE user_id = $1",
        [userId]
      );
      return id.rows[0];
    } catch (err) {
      console.log("Error getting user by id");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },
};
