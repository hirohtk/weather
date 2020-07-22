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
    if (err) {
      console.log("error", err);
      res.json(err);
    }
    else {
      console.log(`creating a new user, name is ${req.body.username}, password is ${req.body.password}`)
      db.FriendsList.create({userID: response._id}).then(() => res.json({name: response.username}));
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
  db.FriendsList.find({userID: req.params.id}).populate("friends").then(response => {
  console.log(`friends for this person are ${response}`);
  // response.friends is an array
    res.json(response);
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
  // console.log(`adding user by userid ${req.params.id}`);
  // console.log(`you are ${req.body.userID}`);
  db.FriendsList.findOneAndUpdate({userID: req.body.userID}, {$push: {friends: req.params.id}}).then(response => {
    console.log(response)
    res.json(response);
  })
});

router.put("/api/updatecoords/:id", function (req, res) {
  // console.log(`pushing your coords, which are ${req.body.coordinates}`);
  db.Users.findByIdAndUpdate(req.params.id, {$set: {coordinates: req.body.coordinates}}).then((response) => {
    console.log(response);
    // response not necessary to send, 
    res.json(response);
  })
});

router.get("/api/getfriendcoords/:id", function (req, res) {
  db.Users.findById(req.params.id).then(response => {
    // console.log(`trying to find coordinates in here:  ${response}`);
    res.json(response);
  })
})

router.get("/private", connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  res.json("Login Success")
});

// router.get("/api/testChat/:id", function (req, res) {
//   console.log(`this route is only accessed for chats, req.params.id is ${req.params.id}`);
//   res.json("yep")
// })

// 6/30/2020:  IF CHATROOM DOES NOT EXIST, MAKE ONE IN THE DB.  OTHERWISE IF SO, JUST RETURN THE DB DOCUMENT
router.put(`/api/getroom/:friendID`, function (req, res) {
  
  // NEED SOME KIND OF ALGO TO COMBINE BOTH USER ID'S INTO ONE BIG STRING THAT'S ALPHABETICALLY SORTED.  THIS WAY NO MATTER WHO
  // JOINS FIRST, THEY ALWAYS GET THE SAME ROOM.  CAN'T JUST CONCATENATE OR WILL HAVE A "WHO INITIATES FIRST"? ISSUE
  let arr = []
  let concat = req.params.friendID + req.body.user
  for (let i = 0; i < concat.length; i++) {
    arr.push(concat[i]);
  }
  let a;
  let b;
  // comparing both strings alphabetically - apparently JS can evaluate strings this way
  if (req.params.friendID > req.body.user) {
    a = req.params.friendID;
    b = req.body.user;
  }
  else {
    a = req.body.user;
    b = req.params.friendID;
  }
  // have an array with all characters in it sorted by alphabetical, then join back into a string
  let sorted = arr.sort().join("");
  // find a chatroom, if it doesn't exist, then make one.  (https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in/33401897#33401897)
  db.Chatroom.findOneAndUpdate({name: sorted, people: [a, b]}, { expire: new Date() }, { upsert: true, new: true, setDefaultsOnInsert: true }).then((response, err) => {
    if (err) return
    // console.log(`RESPONSE FROM CREATING NEW CHATROOM OR FINDING OLD ONE IS ${response}`);
    res.json(response);
  })
})

router.get(`/api/chathistory/:id`, function (req, res) {
  console.log(`FINDING CHATROOM BY ID ${req.params.id}`)
  db.Chatroom.findById(req.params.id).populate({path: "messages", model: "Messages", populate: {path: "author", model: "Users"}}).then(response => {
   console.log(`*** HERE IS YOUR CHAT HISTORY ${response}`)
    res.json(response)});
})

router.get(`/api/peopleinroom/:id`, function (req, res) {
  db.Chatroom.findById(req.params.id).populate("people").then(response => {
    res.json(response);
  })
})

// TAKEN CARE OF BY SOCKET
// router.post(`api/sendmessage/:id`, function (req, res) {
//   db.Message.create({message: req.body.message, author: req.body.author, chatroomID: req.body.chatroomID})
// })

router.get("*", function (req, res) {
  console.log("* route hit")
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;