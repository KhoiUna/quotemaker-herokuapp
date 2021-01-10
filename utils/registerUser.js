const hashPassword = require("../helpers/hashPassword");

const registerUser = async (pool, user) => {
  const client = await pool.connect();
  try {
    const countUsername = await client.query(
      "SELECT COUNT(*) from users WHERE username = $1",
      [user.username]
    );
    //
    if (countUsername.rows[0].count * 1 !== 0) {
      return {
        usernameInvalid: "* Username already taken",
        notMatch: null,
        success: null,
      };
    } else {
      await client.query(
        "INSERT INTO users(username, password) VALUES($1, $2)",
        [user.username, await hashPassword(user.password)]
      );
      return {
        usernameInvalid: null,
        notMatch: null,
        success: "* Registered successfully!",
      };
    }
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    client.release();
  }
};

module.exports = registerUser;
