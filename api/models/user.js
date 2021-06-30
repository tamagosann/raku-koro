const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: String,
  username: String,
  prefecture: String,
});

module.exports = mongoose.model("User", UserSchema);
