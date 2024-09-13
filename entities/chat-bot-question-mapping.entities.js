const mongoose = require("mongoose");

const chatBotQuestionMappingSchema = new mongoose.Schema({
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_organizations',
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_products',
    required: true,
  },
  question_map_id: {
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

module.exports = mongoose.model("chat_question_mapping", chatBotQuestionMappingSchema);
