const Pusher = require('pusher');

const pusherConfig = new Pusher({
    appId : process.env.PUSHER_APP_ID,
    key : process.env.PUSHER_KEY,
    secret : process.env.PUSHER_SECRET,
    cluster : process.env.PUSHER_CLUSTER,
    useTLS : process.env.PUSHER_USE_TLS
});

module.exports = pusherConfig;