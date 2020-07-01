var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({

    chatRoomID: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    message: {
        type: String
    }
});

var Messages = mongoose.model("Messages", MessagesSchema);

// exporting it with local strategy
module.exports = Messages