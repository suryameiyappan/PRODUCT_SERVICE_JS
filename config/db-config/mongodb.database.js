const mongoose = require("mongoose");
/**
 * Connect to mongo db
 * @returns {object} Mongoose connection
 * @public
 */
exports.ConnectMongoDB = () => {
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};
