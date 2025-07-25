const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const getByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    console.log("Decoded token payload:", decoded);
    const user = await User.findById(decoded.id);
    return user;
  } catch (err) {
    console.log("Token verify error:", err.message);
    return null;
  }
};


const getByUsername = async (username) => {

  return await User.findOne({ username });
}
const addUser = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hash,
  });

  await newUser.save();
  return newUser;
};

module.exports = {
  getByToken,
  getByUsername,
  addUser,
};
