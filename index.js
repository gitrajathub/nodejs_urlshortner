//module
const express = require("express");

//mongodb
const { connectToMongoDB } = require("./connect");

//import modules
const urlRoute = require("./routes/url");
const URL = require("./models/url");

//dotenv
require('dotenv').config();

//express app
const app = express();

//configs
const PORT = process.env.PORT || 8000;
const MONGODB = process.env.MONGODB

//mongodb connection
connectToMongoDB(MONGODB).then(() =>
  console.log("Mongodb connected")
);

//json file
app.use(express.json());

//routes
app.use("/url", urlRoute);
//routes (get time of click / history)
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});


//port connection
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
