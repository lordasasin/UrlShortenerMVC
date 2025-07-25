const { getUrlsByUsername, findAllUrls } = require("../repository/url");
const User = require("../models/user");
const getUserUrls = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Invalid user");
    }

    const urls = await getUrlsByUsername(user.username);
    return urls;
  } catch (err) {
    throw new Error("Server Error: " + err.message);
  }
};

const listAllUrls = async () => {
  try {
    const urls = findAllUrls();
    return urls;
  } catch (err) {
    throw new Error("Server Error", err);
  }
};

module.exports = {
  getUserUrls,
  listAllUrls,
};
