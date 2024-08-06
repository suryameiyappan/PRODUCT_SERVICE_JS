const mongoose = require("mongoose");

const chatBotLanguageSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  language_name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("chat_languages", chatBotLanguageSchema);
