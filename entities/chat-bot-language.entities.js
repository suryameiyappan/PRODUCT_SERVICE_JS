const mongoose = require("mongoose");

const chatBotLanguageSchema = new mongoose.Schema({
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_organizations'
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_products'
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
  }
}, { 
  timestamps: true 
},{ 
  strict: false 
});

module.exports = mongoose.model("chat_languages", chatBotLanguageSchema);
