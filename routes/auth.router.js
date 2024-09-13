const 
  express = require("express"),
  router = express.Router(),
  { execute } = require("../services/auth.service");;

router.post("/", execute);

module.exports = router;
