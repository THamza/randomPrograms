const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    messages: [
      {
        message: {type: String, required: true},
        senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
      }
    ]
  },
  {
    timestamps: true
  });

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;
