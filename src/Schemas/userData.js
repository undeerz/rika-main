const { Schema, model } = require("mongoose");

module.exports = model(
  "User",
  new Schema({
    id: { type: String, required: true },
    premium: { type: Boolean, default: false },
    coins: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    gifban: { type: String, default: "" },
  })
);
