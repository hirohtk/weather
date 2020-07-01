module.exports = function (io) {

    const router2 = require("express").Router();

    router2.get("/api/testChat", function (req, res) {
        socket.join('room', function () {
            console.log(`${socket.id} has joined some room`);

            socket.on('SEND_MESSAGE', function (data) {
                io.to('room').emit('RECEIVE_MESSAGE', data);
            })
        });
        console.log(`this route is only accessed for chats, req.params.id is ${req.params.id}`);
        res.json("yep")
    })

    return router2;
};