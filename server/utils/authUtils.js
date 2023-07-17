const bcrypt = require("bcrypt");

//to hash password
const hashPassword = async (password) => {
  try {
    const saltround = 10;
    const hashpass = await bcrypt.hash(password, saltround);
    return hashpass;
  } catch (err) {
    console.log(err);
  }
};

//to compare passwords
const comparePassword = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};

module.exports={
    hashPassword,comparePassword
}
