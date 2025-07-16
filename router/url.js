const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/url");

router.post("/shorten", shortenUrl);
router.get("/:shortUrl", redirectUrl);

module.exports = router;
