const mongoose = require("mongoose");

const wsConnectionSchema = new mongoose.Schema({
  quote_id: {
    type: String
  },
  connection_id: {
    type: String
  },
  connection_status: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model("ws_connection", wsConnectionSchema);
