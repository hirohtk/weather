var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({

    chatRoomID: {
        type: Schema.Types.ObjectId,
        ref: "Chatrooms",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    message: {
        type: String
    }
});

var Messages = mongoose.model("Messages", MessagesSchema);

// exporting it with local strategy
module.exports = Messages