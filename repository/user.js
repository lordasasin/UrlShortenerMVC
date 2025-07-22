const User = require("../models/user");
const bcrypt = require("bcrypt");

const getByToken = async (token) => {
  return await User.findOne({ token });
};

const getByUsername = async (username) => {
  return await User.findOne({ username });
};

const addUser = async (username, password, token) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hash,
    token,
  });

  await newUser.save();
  return newUser;
};

module.exports = {
  getByToken,
  getByUsername,
  addUser,
};
