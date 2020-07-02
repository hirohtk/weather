var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    messages: {
        type: Schema.Types.ObjectId,
        ref: "Messages",
    }
});

var Chatrooms = mongoose.model("Chatrooms", ChatroomSchema);

// exporting it with local strategy
module.exports = Chatrooms