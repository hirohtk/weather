const db = require("../model/index");

module.exports = function (io) {

    io.on('connection', function (socket) {

        console.log(`a user connected, ${socket.id}`);

        socket.on("join", async room => {
            socket.join(room);
            io.emit("roomJoined", room);
        });

        socket.on("message", async data => {
            const { chatRoomName, author, message } = data;

            // ORM/ODM STUFF.  Finding database that the chatroom is associated with, then posting new message to it in 
            // as middleware between socket receiving message and emitting it
            const chatRoom = await db.Chatroom.find({ name: chatRoomName });

            const chatRoomID = chatRoom[0]._id;

            const chatMessage = await db.Message.create({
                chatRoomID,
                author,
                message: message,
            });
            io.emit("newMessage", chatMessage);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });

};