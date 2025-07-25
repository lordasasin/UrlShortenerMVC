const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/url");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/shorten", authMiddleware, shortenUrl);
router.get("/:shortUrl", redirectUrl);

module.exports = router;
