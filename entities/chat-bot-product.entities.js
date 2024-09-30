const mongoose = require("mongoose");

const chatBotProductsSchema = new mongoose.Schema({
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatbot_organizations',
  },
  product_code: {
    type: String,
    required: true,
  },
  product_name: {
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

module.exports = mongoose.model("chatbot_products", chatBotProductsSchema);
