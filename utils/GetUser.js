module.exports = {
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

  async byId(pool, user) {
    const client = await pool.connect();
    try {
      if (user.user_id) {
        const id = await client.query(
          "SELECT user_id, username, email, avatar from users WHERE user_id = $1",
          [user.user_id]
        );
        return id.rows[0];
      } else {
        const id = await client.query(
          "SELECT user_id, username, email, avatar from users WHERE google_id = $1",
          [user.google_id]
        );
        return id.rows[0];
      }
    } catch (err) {
      console.log("Error getting user by id");
      console.log(err);
      return null;
    } finally {
      client.release();
    }
  },
};
