const { generateToken } = require("../utils/generatetoken");
const { findShortUrl , createUrl } = require("../repository/url");
const { getByToken } = require("../repository/user");

const shortenUrlService = async (token, originalUrl) => {
  if (!token || !originalUrl) {
    throw new Error("Token and original URL are required");
  }

  const user = await getByToken(token);
  if (!user) {
    throw new Error("Invalid token");
  }

  const shortUrl = generateToken(6);
  await createUrl(shortUrl, originalUrl, user);

  return {
    shortUrl: `http://localhost:${process.env.PORT}/${shortUrl}`,
  };
};

const redirectUrlService = async (shortUrl) => {
  const url = await findShortUrl(shortUrl);

  if (!url) {
    throw new Error("Short URL not found");
  }

  return url.originalUrl;
};

module.exports = {
  shortenUrlService,
  redirectUrlService,
};
