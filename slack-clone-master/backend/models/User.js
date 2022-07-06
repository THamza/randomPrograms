const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Channel = require("./Channel");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    channelIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
      }],
    friendIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
  },
  {
    timestamps: true
  });

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

const User = mongoose.model("User", userSchema);
module.exports = User;
