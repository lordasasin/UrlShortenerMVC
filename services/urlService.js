const { generateToken } = require('../utils/generatetoken');
const { getByShortUrl, newUrlRepo } = require('../repository/urlRepository');
const { getByToken } = require('../repository/userRepository');

const shortenUrlService = async (token, originalUrl) => {
  if (!token || !originalUrl) {
    throw new Error('Token and original URL are required');
  }

  const user = await getByToken(token);
  if (!user) {
    throw new Error('Invalid token');
  }

  const shortUrl = generateToken(6);
  await newUrlRepo(shortUrl, originalUrl, user);

  return {
    shortUrl: `http://localhost:${process.env.PORT}/${shortUrl}`,
  };
};

const redirectUrlService = async (shortUrl) => {
  const url = await getByShortUrl(shortUrl);

  if (!url) {
    throw new Error('Short URL not found');
  }

  return url.originalUrl;
};

module.exports = {
  shortenUrlService,
  redirectUrlService,
};
