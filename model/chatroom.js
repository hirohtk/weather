var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    people : [{
        type: Schema.Types.ObjectId,
        ref: "Users",
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Messages",
    }],
    offlineUnread: {
        type: String,
        default: ""
    }
});

var Chatrooms = mongoose.model("Chatrooms", ChatroomSchema);

// exporting it with local strategy
module.exports = Chatrooms