const { Schema, model } = require("mongoose");

module.exports = model("User",
new Schema({
  id: {type: String, required: true},
  })
);
