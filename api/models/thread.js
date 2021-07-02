const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  uid: String,
  username: String,
  prefecture: String,
  comment: String,
});

module.exports = mongoose.model("Thread", ThreadSchema);
