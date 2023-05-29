const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

//url shortner (input=url)
router.post("/", handleGenerateNewShortURL);

//analytics (total clicks, time) 
router.get("/analytics/:shortId", handleGetAnalytics);

//export
module.exports = router;
