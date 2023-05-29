//module
const shortid = require("shortid");

//import model
const URL = require("../models/url");

//url shortner controller
async function handleGenerateNewShortURL(req, res) {
  const body = req.body; //user input
  if (!body.url) { //no user data
    return res.status(400).json({ error: "url is required" });
  }

  //module function
  const shortID = shortid(); 

  //creating short url
  await URL.create({
    shortId: shortID, //shortid from module function
    redirectURL: body.url, //user data (original url)
    visitHistory: [], //empty visit history
  });

  return res.json({ id: shortID }); //output short url id
}

//analytics controller
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId; //user data from req url (params)
  const result = await URL.findOne({ shortId }); //findOne from mongodb
  return res.json({
    totalClicks: result.visitHistory.length, //totalclicks = visit history array length
    analytics: result.visitHistory, //visitHstory = visit history array data
  });
}
//export controller functions
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
