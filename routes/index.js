const path = require("path");
const router = require("express").Router();
const db = require("../model/index");
const axios = require("axios");
require('dotenv').config()

let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const passport = require("passport");

// This was needed to be here with routes, rather than server
passport.use(db.Users.createStrategy());
passport.serializeUser(db.Users.serializeUser());
passport.deserializeUser(db.Users.deserializeUser());

// The connect-ensure-login package is middleware that ensures a user is logged in.
const connectEnsureLogin = require("connect-ensure-login");

router.post("/api/login", (req, res, next) => {
  /* PASSPORT LOCAL AUTHENTICATION */
  console.log(`trying to login`)
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // authentication failure:
    if (!user) {
      console.log("failure")
      return res.json("Failure")
      // return res.redirect('/login?info=' + info);
    }
    // authentication success:
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log("success!")
      return res.json({username: user.username, id: user._id})
      // return res.redirect('/');
    });

  })(req, res, next);
});

router.post("/api/register", function (req, res) {
  console.log("register route")
  console.log(req.body);
  console.log(req.body.username)
  db.Users.register({ username: req.body.username }, req.body.password, (err, response) => {
    console.log("mongoose went")
    if (err) {
      console.log("error", err);
      res.json(err);
    }
    else {
      console.log(`creating a new user, name is ${req.body.username}, password is ${req.body.password}`)
      res.json({name: response.username})
    }
  });
});

router.get("/api/googleplaces/:place", function (req, res) {
  let loc = req.params.place
  console.log(`serverside loc is ${loc}`)
  axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${loc}&inputtype=textquery&fields=photos&key=${apiKey}`).then(response => {
    // console.log(response.data);
    let photoRef = response.data.candidates[0].photos[0].photo_reference;
    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2400&photoreference=${photoRef}&key=${apiKey}`).then(response => {
      // FOUND URL IN THE RESPONSE.config - USING THIS INSTEAD OF response.DATA
      res.json(response.config.url);
    })
  })
})

router.get("/api/loadfriends/:id", function (req, res) {
  console.log(`req.params.id is ${req.params.id} which should be me`)
  db.Users.findById(req.params.id).then(response => {
  console.log(`friends for this person are ${response}`);
    res.json(response.friends);
  })
})

router.get("/api/allusers/:user", function (req, res) {
  console.log(`finding user by username ${req.params.user}`);
  db.Users.find({username: req.params.user}).then(response => {
    console.log(response)
    res.json(response);
  })
});

router.put("/api/addusers/:id", function (req, res) {
  console.log(`adding user by userid ${req.params.id}`);
  console.log(`you are ${req.body.userID}`);
  db.Users.findByIdAndUpdate(req.body.userID, {$push: {friends: req.params.id}}).then(response => {
    console.log(response)
    res.json(response);
  })
});

router.get("/private", connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  res.json("Login Success")
});

router.get("*", function (req, res) {
  console.log("* route hit")
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;