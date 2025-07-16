const express = require("express");
const router = express.Router();
const { getMyUrls, listUrls } = require("../controllers/user");

router.get("/myurls", getMyUrls);
router.get("/list", listUrls);

module.exports = router;
