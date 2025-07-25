const { urlShorten, urlRedirect } = require("../services/url");

const shortenUrl = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const { originalUrl } = req.body;

  try {
    const result = await urlShorten(token,originalUrl);
    res.status(200).json({
      result,
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error" });
  }
};

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  if (!shortUrl || shortUrl.trim() === "") {
    return res.status(400).json({ error: "shortUrl is required" });
  }
  try {
    const originalUrl = await urlRedirect(shortUrl);
    return res.redirect(originalUrl);
  } catch (err) {
   

    return res.status(404).json({ error: "Short URL not found" });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
