const 
  express = require("express"),
  router = express.Router(),
  { apiVersion } = require("../services/app.service");

router.get("/", apiVersion);

module.exports = router;
