const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/shorten',shortenUrl);
router.get('/:shortUrl', redirectUrl);

module.exports = router;
