const mongoose = require("mongoose");

const chatBotConfigSchema = new mongoose.Schema({
  bot: {
    type: String
  },
  api_key: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model("chat_bot_config", chatBotConfigSchema);
