const mongoose = require("mongoose");

const chatBotConfigSchema = new mongoose.Schema({
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_organizations'
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_products'
  },
  bot_id: {
    type: String,
    required: true,
  },
  api_key: {
    type: String,
    required: true,
  },
  session_key: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, { 
  timestamps: true 
},{ 
  strict: false 
});

module.exports = mongoose.model("chat_bot_config", chatBotConfigSchema);
