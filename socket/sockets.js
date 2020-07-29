const db = require("../model/index");

module.exports = function (io) {

    io.on('connection', function (socket) {

        console.log(`a user connected, ${socket.id}`);

        socket.on("join", async (room, test) => {
            // roomid = room;
            // console.log(`THIS IS SOCKET ${socket.id} WHO IS NOW JOINING ROOM ${room}, and has a mongoID of ${test.id}`)
            socket.join(room);
            // from https://stackoverflow.com/questions/50045613/how-to-find-all-sockets-in-room-using-the-latest-version-of-socket-io
            let connecteds = io.sockets.adapter.rooms[room].sockets;
            console.log(`room joined.  connecteds are ${JSON.stringify(connecteds)}. *** These are the people who are connected to the same room, ${room}.`)
            let obj = {room: room, who: test.id, username: socket.id, connected: connecteds};
            io.emit("roomJoined", obj);
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
            // userName.username is an ID and not an actual name
            chatMessage.author = userName.username;
            // console.log(`Updating chatroom ${chatRoomID}, pushing message with id of ${chatMessage._id}`)
            db.Chatroom.findByIdAndUpdate(chatRoomID, { $push: { messages: chatMessage._id } }).then(response => {
                console.log(`response from adding message to chatroom is ${response}.`)
                // console.log(`JSON.stringifying is ${JSON.stringify(response)}.`)
            })
            
            // console.log(`pushed message to chatroom ID ${chatRoomID}, message id is ${chatMessage._id}, author is ${chatMessage.author}, message is ${message}`)

            // adding username key to author because the db response convention is as such, so for continuity in the .map, I am doing this
            const newObj = { message: chatMessage.message, author: {id: chatMessage.author}, chatroomID: chatRoomID };
            // console.log(`newObj being sent to front end is ${JSON.stringify(newObj)}`);
            io.to(chatRoomID).emit("newMessage", newObj);
        });

        socket.on(`leaveRoom`, function (data) {
            console.log(`someone left room- they are ${data}`);
            io.emit(`leftRoom`, data);
        })

        socket.on('disconnect', function (data) {
            io.emit(`leftRoom`, data);
            // https://stackoverflow.com/questions/39084924/componentwillunmount-not-being-called-when-refreshing-the-current-page
            console.log(`user disconnected but leaveRoom is handled by beforeUnload`);
        });
    });

};