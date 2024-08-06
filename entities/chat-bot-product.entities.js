const mongoose = require("mongoose");

const chatBotProductsSchema = new mongoose.Schema({
  organization_id: {
    type: String,
    required: true,
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
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("chatbot_products", chatBotProductsSchema);
