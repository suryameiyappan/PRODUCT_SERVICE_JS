const mongoose = require("mongoose");

const chatBotQuestionSchema = new mongoose.Schema({
  question_id: {
    type: String
  },
  next_question_id: {
    type: String
  },
  product_id: {
    type: String
  },
  language: {
    type: String
  },
  question_type: {
    type: String
  },
  question_map_id: {
    type: String
  },
  question: { type: Object },
  validation: {type: Object },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model("chat_questions_new", chatBotQuestionSchema);
