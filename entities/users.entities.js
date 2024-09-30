const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  PhoneNumber: {
    type: String,
    required: true,
  },
  campaign_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", usersSchema);
