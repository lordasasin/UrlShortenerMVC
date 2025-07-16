const {
  shortenUrlService,
  redirectUrlService,
} = require("../services/url");

const shortenUrl = async (req, res) => {
  const { token, originalUrl } = req.body;
  try {
    const result = await shortenUrlService(token, originalUrl);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Error" });
  }
};

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const originalUrl = await redirectUrlService(shortUrl);
    return res.redirect(originalUrl);
  } catch (err) {
    res.status(404).json({ error: err.message || "Error" });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
