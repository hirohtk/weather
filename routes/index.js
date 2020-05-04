const path = require("path");
const router = require("express").Router();
// const db = require("../model/index");

const axios = require("axios");
// const cheerio = require("cheerio");

// const passport = require("passport");

// This was needed to be here with routes, rather than server
// passport.use(db.Users.createStrategy());
// passport.serializeUser(db.Users.serializeUser());
// passport.deserializeUser(db.Users.deserializeUser());

// /The connect-ensure-login package is middleware that ensures a user is logged in.
// const connectEnsureLogin = require("connect-ensure-login");

// As of 4/6/2020 this route is used solely for scraping articles and getting them into the db (basically an exercise
// for scraping, as it would have been easier to just manually seed.  However this can extend usefulness to doing daily scrapes from CNN)

// If no API routes are hit, send the React app

router.get("/test", (req, res) => {

    res.json("test");
});

router.get("/yeet", (req, res) => {

    res.json("well yeet");
});

router.get("*", function (req, res) {
    console.log("yes")
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
