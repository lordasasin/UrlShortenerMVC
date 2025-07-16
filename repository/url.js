const Url = require("../models/url");

const findShortUrl = async (shortUrl) => {
  return await Url.findOne({ shortUrl });
};

const findAllUrls = async () => {
  return await Url.find();
};

const createUrl = async (shortUrl, originalUrl, user) => {
  const newUrl = new Url({
    shortUrl,
    originalUrl,
    createdBy: user.username,
  });
  await newUrl.save();
  return newUrl;
};

const getUrlsByUsername = async (username) => {
  return await Url.find({ createdBy: username });
};

module.exports = {
  findShortUrl,
  findAllUrls,
  getUrlsByUsername,
  createUrl,
};
