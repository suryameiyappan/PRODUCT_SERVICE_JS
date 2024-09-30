const 
  express = require("express"),
  router = express.Router(),
  { apiVersion, mongoStatus, cliOperations } = require("../services/app.service");

router.get("/version", apiVersion);
router.get("/mongodb/status", mongoStatus);
router.get("/cli-operations", cliOperations);

module.exports = router;
