const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const contacts = mongoose.model(
  "contacts",
  new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    type: Schema.Types.String,
    value: Schema.Types.String,
  }),
  "contacts"
);

module.exports = contacts;
