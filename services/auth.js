const bcrypt = require("bcrypt");

const generateJwtToken = require("../utils/generateJwtToken");
const { getByUsername, addUser } = require("../repository/user");

const userRegister = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Username and password required");
  }

  const existingUser = await getByUsername(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const newUser = await addUser(username, password);

  const token = generateJwtToken({
    id: newUser._id,
    username: newUser.username,
  });

  return {
    message: "User registered successfully",
    token,
  };
};

const userLogin = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Username and password required");
  }

  const user = await getByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Incorrect password");
  }
  const token = generateJwtToken({ id: user._id, username: user.username });

  return {
    message: "Login successful",
    token: token,
  };
};

module.exports = {
  userRegister,
  userLogin,
};
