module.exports = async (pool, username, avatarPath, user_id) => {
  const client = await pool.connect();
  try {
    const countUsername = await client.query(
      "SELECT COUNT(*) from users WHERE username = $1",
      [username]
    );
    //
    if (countUsername.rows[0].count * 1 !== 0) {
      return false;
    } else {
      await client.query(
        "UPDATE users SET username = $1, avatar = $2 WHERE user_id = $3",
        [username, avatarPath, user_id]
      );
      return true;
    }
  } catch (err) {
    console.error("Error updating user to db");
    return null;
  } finally {
    client.release();
  }
};
