const User = require('../models/user');
const Url = require('../models/url');
const { generateToken } = require('../utils/generatetoken');

const shortenUrlService = async (token, originalUrl) => {
    if (!token) {
        throw new Error('Token required in body');
    }
    if (!originalUrl) {
        throw new Error('originalUrl required');
    }

    const user = await User.findOne({ token });
    if (!user) {
        throw new Error('Invalid token');
    }

    const shortUrl = generateToken(6);
    const newUrl = new Url({
        shortUrl,
        originalUrl,
        createdBy: user.username
    });
    await newUrl.save();

    return { shortUrl: `http://localhost:${process.env.PORT}/${shortUrl}` };
};

const redirectUrlService = async (shortUrl) => {
    const url = await Url.findOne({ shortUrl });
    if (!url) {
        throw new Error('Short URL not found');
    }
    return url.originalUrl;
};

module.exports = {
    shortenUrlService,
    redirectUrlService
};
