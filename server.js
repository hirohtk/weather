const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes/index.js");
const PORT = process.env.PORT || 3001;
const passport = require('passport');

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
  app.use(express.static("client"));
}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession);
/*  PASSPORT SETUP  */

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Start the server

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log(`a user connected, ${socket.id}`);
  // socket.on('chat message', function(msg){
  //     io.emit('chat message', msg);
  //     console.log('message: ' + msg);
  //   });
  // socket.on('disconnect', function(){
  //     console.log('user disconnected');
  //   });

  // PROOF OF CONCEPT FOR MAKING SOCKET JOIN ROOM 
  // each person is a socket and they must join a room.
  // socket.join('room', function () {
  //   console.log(`${socket.id} has joined some room`);
  //   socket.on('SEND_MESSAGE', function (data) {
  //     io.to('room').emit('RECEIVE_MESSAGE', data);
  //   })
  // });

  // DEFAULT:
  // socket.on('SEND_MESSAGE', function (data) {
  //   io.emit('RECEIVE_MESSAGE', data);
  // })
});

// Use this route if someone starts chat, create own chat room
app.use(require("./socket/sockets.js")(io))

server.listen(PORT, function () {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});

// app.listen(PORT, function() {
//   console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
// });
