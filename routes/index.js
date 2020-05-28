const path = require("path");
const router = require("express").Router();
const db = require("../model/index");

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
  db.Users.register({ username: req.body.username }, req.body.password, (err, response) => {
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

router.get("/private", connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  res.json("Login Success")
});

router.get("*", function (req, res) {
  console.log("* route hit")
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;