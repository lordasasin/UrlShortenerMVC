const Url = require('../models/url');


const getByShortUrl = async (shortUrl) => {
    return await Url.findOne({ shortUrl });
};

const getAllUrls = async () => {
    return await Url.find();
  };

const newUrlRepo = async (shortUrl, originalUrl, user) => {
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
    getByShortUrl,
    newUrlRepo,
    getUrlsByUsername,
    getAllUrls
};
