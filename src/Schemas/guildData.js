const { Schema, model } = require("mongoose");

module.exports = model(
  "Guild",
  new Schema({
    id: { type: String, required: true },
    welcome: {
      status: {
        type: Boolean,
        default: false,
      },
      channel: {
        type: String,
        default: null,
      },
      message: {
        type: String,
        default: null,
      },
    },
  })
);
