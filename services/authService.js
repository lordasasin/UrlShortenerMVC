const User = require('../models/user');
const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/generatetoken');

const registerUserService = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error('Username and password required');
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const token = generateToken();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password ,salt);

  const newUser = new User({

    username, 
    password : hash,
    token 

   });
   console.log(newUser);
  await newUser.save();

  return {
    message: 'User registered successfully',
    token,
  };
};

const loginUserService = async ({ username, password }) => {
  if (!username || !password) {

    throw new Error('Username and password required');
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {

    throw new Error('Incorrect password');
  }

  

  return {
    message: 'Login successful',
    token: user.token,
  };
};

module.exports = {
  registerUserService,
  loginUserService,
};
