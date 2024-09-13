const db = require("../../models");
/**
 * Connect to mysql db
 * @returns {object} mysql connection
 * @public
 */
exports.ConnectMySql = () => {
  db.sequelize.sync({ force: false }).then(() => {
    console.log("mysql db has been re sync")
  })
  .catch((err) => {
    console.log("Failed to connect mysql: " + err.message);
  });
};
