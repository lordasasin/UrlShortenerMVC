const { generateToken } = require("../utils/generatetoken");
const { findShortUrl, createUrl } = require("../repository/url");
const { getByToken } = require("../repository/user");
const user = require("../models/user");

const urlShorten = async (token ,originalUrl) => {
 

  if (!originalUrl) {
    throw new Error("Original URL are required");
  }

  const User = await getByToken(token);
  if (!User) {
    throw new Error("Invalid token");
  }

  const shortUrl = generateToken(6);
  await createUrl(shortUrl, originalUrl, user);

  return {
    shortUrl: `http://localhost:${process.env.PORT}/url/${shortUrl}`,
  };
};

const urlRedirect = async (shortUrl) => {
  const url = await findShortUrl(shortUrl);

  if (!url) {
    throw new Error("Short URL not found");
  }

  return url.originalUrl;
};

module.exports = {
  urlShorten,
  urlRedirect,
};
