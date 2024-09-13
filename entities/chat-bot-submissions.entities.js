const mongoose = require("mongoose");

const chatBotSubmissionSchema = new mongoose.Schema({
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_organizations'
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_products'
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat_questions'
  },
  question_language: {
    type: String,
    required: true
  },
  question_code: {
    type: String,
    required: true
  },
  bot_question: {
    type: String,
    required: true
  },
  received_message: {
    type: String,
    required: true
  },
  page_url: {
    type: String,
    required: true
  },
  timestamp_client: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
},{ 
  strict: false 
});

module.exports = mongoose.model("chat_bot_submissions", chatBotSubmissionSchema);
