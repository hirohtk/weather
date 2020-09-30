const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes/index.js");
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const cors = require("cors");
const chat = require('./socket/sockets');
const cookieSession = require("cookie-session");
const cors = require("cors");


// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// AUTH stuff
// DIRECTLY BELOW NOT NEEDED (this is from tutorial.  express.urlencoded works with Express v4.16+)
// const bodyParser = require('body-parser');
// Tutorial :https://www.sitepoint.com/local-authentication-using-passport-node-js/
const expressSession = require('express-session')({
  secret: 'probiotic',
  resave: false,
  saveUninitialized: false
});

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/weather";
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("Connected to MongoDB!")
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.use(cors());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ** OAUTH 2.0
// Cookie setup
app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:[process.env.COOKIE_KEY]
}));
// ** OAUTH 2.0

app.use(expressSession);
/*  PASSPORT SETUP  */

app.use(passport.initialize());
app.use(passport.session());
// app.use(require("./socket/sockets.js")(io))

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(routes);

chat(io);

// Start the server

server.listen(PORT, function () {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});

// app.listen(PORT, function() {
//   console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
// });
