const hashPassword = require("../helpers/hashPassword");
const sendMail = require("../helpers/sendMail");

const registerUser = async (pool, user, method = "manually") => {
  const client = await pool.connect();
  try {
    const countUsername = await client.query(
      "SELECT COUNT(*) from users WHERE email = $1",
      [user.email]
    );
    //
    if (countUsername.rows[0].count * 1 !== 0) {
      return {
        usernameInvalid: "* Email already used",
        notMatch: null,
        success: null,
      };
    } else {
      if (method === "manually") {
        await client.query(
          "INSERT INTO users(username, email, log_in_with, password) VALUES($1, $2, $3, $4)",
          [user.username, user.email, method, await hashPassword(user.password)]
        );
        //Send mail to user
        sendMail(user.email, user.username);

        return {
          usernameInvalid: null,
          notMatch: null,
          success: "* Registered successfully!",
        };
      } else {
        await client.query(
          "INSERT INTO users(username, email, avatar, log_in_with, google_id) VALUES($1, $2, $3, $4, $5)",
          [user.username, user.email, user.avatar, method, user.googleId]
        );
        //Send mail to user
        sendMail(user.email, user.username);
      }
    }
  } catch (err) {
    console.error("Error saving user to db");
    return null;
  } finally {
    client.release();
  }
};

module.exports = registerUser;
