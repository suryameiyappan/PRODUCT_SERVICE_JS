const mongoose = require("mongoose");

const chatBotLanguageMasterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  handle_name: {
    type: String
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

module.exports = mongoose.model("chat_language_master", chatBotLanguageMasterSchema);
