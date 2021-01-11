const bcrypt = require("bcrypt");

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.log("Error comparing password");
    console.log(err);
  }
  return false;
};
module.exports = comparePassword;
