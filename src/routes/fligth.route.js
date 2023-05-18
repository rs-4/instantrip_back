const express = require("express");
const router = express.Router();
const fligthController = require("../controllers/fligth.controller");

router.get("/", fligthController.addFligth);
router.delete("/", fligthController.deleteAllfligth);

module.exports = router;
