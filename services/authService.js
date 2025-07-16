const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/generatetoken');
const {getByShortUrl} = require('../repository/urlRepository');
const {getByToken , getByUsername, addUserRepo} = require('../repository/userRepository');




const registerUserService = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error('Username and password required');
  }

  const existingUser =  await getByUsername(username);

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const token = await generateToken();

  

  const newUser = await addUserRepo(username,password,token);

   console.log(newUser);
  

  return {
    message: 'User registered successfully',
    token,
  };
};

const loginUserService = async ({ username, password }) => {
  if (!username || !password) {

    throw new Error('Username and password required');
  }

  const user = await getByUsername(username);

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
