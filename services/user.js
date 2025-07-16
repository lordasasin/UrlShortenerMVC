const {
  getUrlsByUsername,
  findAllUrls,
} = require("../repository/url");
const { getByToken } = require("../repository/user");

const getMyUrlsService = async (token) => {
  try {
    const user = getByToken(token);
    if (!user) {
      throw new Error("Invaled Token");
    }

    getUrlsByUsername();
  } catch (err) {
    throw new Error("Server Error" , err);
  }
};

const listUrlsService = async () => {
  try {
    const urls = findAllUrls();
    return urls;
  } catch (err) {
    throw new Error("Server Error", err);
  }
};

module.exports = {
  getMyUrlsService,
  listUrlsService,
};
