const wsConnection = require("../entities/ws-connection.entities");

async function checkWebSocket(quoteId) {
  try {
    return await wsConnection.findOne({ quote_id: quoteId });
  } catch (error) {
    throw new Error(`Web Socket Repository checkWebSocket Method : ${error}`);
  }
}

async function connectWebSocket(reqBody) {
  try {
    return await wsConnection.create(reqBody);
  } catch (error) {
    throw new Error(`Web Socket Repository connectWebSocket Method : ${error}`);
  }
}

async function deleteWebQuoteId(quoteId) {
  try {
    return await wsConnection.deleteOne({ quote_id: quoteId });
  } catch (error) {
    throw new Error(`Web Socket Repository deleteWebQuoteId Method : ${error}`);
  }
}

module.exports = {
  checkWebQuoteId: checkWebSocket,
  connectSocket: connectWebSocket,
  deleteWebQuoteId: deleteWebQuoteId
};