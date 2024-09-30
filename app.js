require("dotenv").config();

const express = require("express"),
  app = express(),
  cors = require('cors'),
  path = require("path"),
  logger = require("morgan"),
  env = process.env.NODE_ENV,
  bodyParser = require("body-parser"),
  session = require("express-session"),
  createError = require("http-errors"),
  cookieParser = require('cookie-parser'),
  appRouter = require("./routes/app.router"),
  authRouter = require("./routes/auth.router"),
  productRouter = require("./routes/product.router"),
  chatBotRouter = require("./routes/chat-bot.router"),
  { DEV_ENV } = require("./constants/common.constant"),
  methodMiddleware = require("./middleware/method.middleware"),
  { ConnectMySql } = require("./config/db-config/mysql.database"),
  ApiServiceProvider = require("./providers/api-service.provider"),
  { ConnectMongoDB } = require("./config/db-config/mongodb.database"),
  logoutServiceProvider = require("./providers/logout-service.provider"),
  { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./constants/error.constant"),
  sessionConfig = require("./config/app-config/session.config").sessionConfig();
/*
|--------------------------------------------------------------------------
| MONGO DB CONNECTION & MYSQL DB CONNECTION
|--------------------------------------------------------------------------
*/
ConnectMongoDB();
ConnectMySql();
/*
|--------------------------------------------------------------------------
| CONNECT REDIS
|--------------------------------------------------------------------------
*/
// app.use(session(sessionConfig.redisClient));
/*
|--------------------------------------------------------------------------
| DEVELOPMENT ENVIRONMENT USED TO STORE LOGS
|--------------------------------------------------------------------------
*/
app.use(logger("dev"));
/*
|--------------------------------------------------------------------------
| PARSED JSON DATA & URL-ENCODED DATA SEND IN THE REQUEST BODY
|--------------------------------------------------------------------------
*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000000}));
app.use(cookieParser(process.env.SESSION_SECRET));
/*
|--------------------------------------------------------------------------
| CONFIGURE MAIL TEMPLATE ENGINE
|--------------------------------------------------------------------------
*/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
/*
|--------------------------------------------------------------------------
| CONFIGURE CLIENT SIDE DATA FILES USING PUBLIC FOLDER
|--------------------------------------------------------------------------
*/
app.use(express.static(path.join(__dirname, "public")));
/*
|--------------------------------------------------------------------------
| COMMON MIDDLEWARE USING FOR SEND OBJECTS TO PUG FILES
|--------------------------------------------------------------------------
*/
app.use((request, response, next) => {
  request.factory = ApiServiceProvider;
  request.logout = logoutServiceProvider;
  response.locals.env = env;
  next();
});
/*
|--------------------------------------------------------------------------
| APP ROUTERS
|--------------------------------------------------------------------------
*/
app.use("/api/application/", methodMiddleware(['GET']), appRouter);
app.use("/api/v1/chatbot/", methodMiddleware(['POST']), chatBotRouter);
app.use("/api/v1/product/", methodMiddleware(['POST']), productRouter);
app.use("/api/v1/authentication", methodMiddleware(['POST']), authRouter);
/*
|--------------------------------------------------------------------------
| Initialize cron tasks & job workers
|--------------------------------------------------------------------------
*/

// require('./cron/index.cron');
require('./worker/index.worker');
/*
|--------------------------------------------------------------------------
| CATCH 404 AND FORWARD TO ERROR HANDLER
|--------------------------------------------------------------------------
*/
app.use(function (request, response, next) {
  next(createError(NOT_FOUND));
});
/*
|--------------------------------------------------------------------------
| ERROR HANDLER FOR INTERNAL SERVER ERROR & NOT FOUND & OTHER ERRORS
|--------------------------------------------------------------------------
*/
app.use(function (err, request, response, next) {
  const APP_ENV = request.app.get("env");
  const ISDEVENV = APP_ENV === DEV_ENV;
  response.locals.message = err.message;
  response.locals.error = ISDEVENV ? err : {};
  if(err.status === NOT_FOUND)
    return response.status(NOT_FOUND).send({ code: NOT_FOUND, message: err.message });
  return response.status(err.status || INTERNAL_SERVER_ERROR).send({ code: INTERNAL_SERVER_ERROR, message: err.message });
});

module.exports = app;
