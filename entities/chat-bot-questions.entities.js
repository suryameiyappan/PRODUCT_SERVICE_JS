const { array } = require("joi");
const mongoose = require("mongoose");

const chatBotQuestionSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat_question_mapping',
  },
  question_id: {
    type: String
  },
  next_question_id: {
    type: String
  },
  language: {
    type: String
  },
  question_type: {
    type: String
  },
  question: { 
    type: Object 
  },
  validation: {
    type: Object 
  },
  module: {
    type: Object
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},{ 
  strict: false 
});

module.exports = mongoose.model("chat_questions", chatBotQuestionSchema);
