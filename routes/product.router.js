const 
  express = require("express"),
  router = express.Router(),
  multer = require('multer'),
  storage = multer.memoryStorage(),
  upload = multer({ storage: storage }),
  { execute } = require("../services/product.service")
  authMiddleware = require("../middleware/auth.middleware");

router.post("/service", authMiddleware, upload.single('file'), execute);

module.exports = router;
