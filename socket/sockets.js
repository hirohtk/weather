const db = require("../model/index");

module.exports = function (io) {

    io.on('connection', function (socket) {

        console.log(`a user connected, ${socket.id}`);

        socket.on("join", async room => {
            console.log(`room ${room} was joined`)
            socket.join(room);
            io.emit("roomJoined", room);
        });

        socket.on("message", async data => {
            const { chatroomName, author, message } = data;

            // ORM/ODM STUFF.  Finding database that the chatroom is associated with, then posting new message to it in 
            // as middleware between socket receiving message and emitting it
            const chatRoom = await db.Chatroom.find({ name: chatroomName });

            const chatRoomID = chatRoom[0]._id;

            const chatMessage = await db.Message.create({
                chatRoomID: chatRoomID,
                author: author,
                message: message,
            });
            // COULD DO POPULATE HERE INSTEAD I THINK TO GET USERNAME FROM author
            const userName = await db.Users.findById(author);
            chatMessage.author = userName.username;

            db.Chatroom.findByIdAndUpdate(chatRoomID, { $push: { messages: chatMessage._id } }).then(response => console.log(`*** IF THERE IS A RESPONSE 
            FROM CHATROOM PUSH QUERY THEN IT'S ${response}`));
            const newObj = { message: chatMessage.message, author: chatMessage.author };
            console.log(`logging so I can see what returned from message creation in mongo.  Anything I can use for username here?  ${chatMessage}`)
            io.emit("newMessage", newObj);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });

};