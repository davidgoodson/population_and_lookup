const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const users = mongoose.model(
  "users",
  new Schema({
    _id: Schema.Types.ObjectId,
    name: Schema.Types.String,
    department: Schema.Types.String,
    comms: [{ type: Schema.Types.ObjectId, ref: "contacts" }],
  }),
  "users"
);

module.exports = users;
