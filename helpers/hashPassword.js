const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
    return await bcrypt.hash(password, salt); // Hash password
  } catch (error) {
    console.log("Error hashing password");
    console.log(err);
    return null;
  }
};

module.exports = hashPassword;
