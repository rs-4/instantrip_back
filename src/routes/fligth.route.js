const express = require("express");
const router = express.Router();
const fligthController = require("../controllers/fligth.controller");

router.get("/", fligthController.addFligth);
router.delete("/", fligthController.deleteAllfligth);
router.post("/filter", fligthController.searchFlights);

module.exports = router;
