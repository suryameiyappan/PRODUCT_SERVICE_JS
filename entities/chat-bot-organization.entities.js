const mongoose = require("mongoose");

const chatBotOrganizationsSchema = new mongoose.Schema({
  organization_code: {
    type: String,
    required: true,
  },
  organization_name: {
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

module.exports = mongoose.model("chatbot_organizations", chatBotOrganizationsSchema);
