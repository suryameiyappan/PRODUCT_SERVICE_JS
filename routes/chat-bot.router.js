const 
  express = require("express"),
  router = express.Router(),
  authMiddleware = require("../middleware/auth.middleware"),
  { execute } = require("../services/product.service");

router.post("/boot", execute);
router.post("/service", authMiddleware, execute);

module.exports = router;
