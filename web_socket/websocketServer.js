const 
  connections = new Map(),
  WebSocket = require('ws'),
  { v4: uuidv4 } = require('uuid'),
  webSocketRepo = require('../repositories/ws-connection.repositories');
/*
|--------------------------------------------------------------------------
| CREATE WEBSOCKET SERVER CONNECTION
|--------------------------------------------------------------------------
*/
function webSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    /*
    |--------------------------------------------------------------------------
    | WS CONNECTION
    |--------------------------------------------------------------------------
    */
    wss.on('connection', async (ws, req) => {
        const url = new URL(req.url, 'ws://' + req.headers.host);
        const quoteId = url.searchParams.get('quoteid');
        const connectionId = uuidv4();
        connections.set(connectionId, ws);
        const interval = setInterval(async () => {
            let connectWebSocket = await webSocketRepo.checkWebQuoteId(quoteId);
            let response;
            if ((connectWebSocket !== null) && (connectionId != connectWebSocket?.connection_id)) {
                response = "400";
            } else if ((connectWebSocket !== null) && (connectionId == connectWebSocket?.connection_id)) {
                response = "200";
            } else {
                await webSocketRepo.connectSocket({
                    quote_id : quoteId,
                    connection_id: connectionId,
                    connection_status: "Connected"
                }); 
                response = "200";
            }
            let message = (response == '200') ? 'continue' : 'abort';
            sendMessage(message, connectionId);
        }, 3000);
        /*
        |--------------------------------------------------------------------------
        | MESSAGE FROM CLIENT
        |--------------------------------------------------------------------------
        */
        ws.on('message', (message) => {
            JSON.parse(message.toString('utf8'));
        });
        /*
        |--------------------------------------------------------------------------
        | CLOSE WS CONNECTION
        |--------------------------------------------------------------------------
        */
        ws.on('close', async () => {
            connections.delete(connectionId);
            let closeResponse;
            let getWebSocket = await webSocketRepo.checkWebQuoteId(quoteId);
            if ((getWebSocket !== null) && (connectionId == getWebSocket?.connection_id)) {
                closeResponse =  await webSocketRepo.deleteWebQuoteId(quoteId);
            }
            let closeMessage = (closeResponse?.deletedCount) ? 'continue' : 'abort';  
            sendMessage(closeMessage, connectionId);
            clearInterval(interval);
            console.log('Client disconnected.');
        });
    });
}
/*
|--------------------------------------------------------------------------
| SEND MESSAGE FUNCTION
|--------------------------------------------------------------------------
*/
function sendMessage(msg, connectionId) {
    for (const [id, ws] of connections.entries()) {
        if (id == connectionId) {
            ws.send(msg);
        }
    }
}

module.exports = webSocketServer;