var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendsListSchema = new Schema({

    userID: {
        type: String,
        required: true,
        unique: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    }]
});

var FriendsList = mongoose.model("FriendsList", FriendsListSchema);

// exporting it with local strategy
module.exports = FriendsList;