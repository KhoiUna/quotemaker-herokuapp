const comparePassword = require("../helpers/comparePassword");

const checkLogin = async (pool, user, req) => {
  const client = await pool.connect();
  try {
    const userIdAndPassword = await client.query(
      "SELECT user_id, username, password from users WHERE username = $1",
      [user.username]
    );
    //
    if (userIdAndPassword.rows[0]) {
      if (
        await comparePassword(user.password, userIdAndPassword.rows[0].password)
      ) {
        req.session.user = {
          userId: userIdAndPassword.rows[0].user_id,
          username: userIdAndPassword.rows[0].username,
        }; //add user obj to session
        return "Login";
      } else {
        return {
          warn: "* Wrong password",
          logout: null,
        };
      }
    } else {
      return { warn: "* Invalid username", logout: null };
    }
  } catch (err) {
    console.log("Error checking user");
    console.log(err);
    return null;
  } finally {
    client.release();
  }
};

module.exports = checkLogin;
