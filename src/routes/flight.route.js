const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flight.controller.js");

router.get("/", flightController.addFligth);
router.delete("/", flightController.deleteAllfligth);
router.post("/filter", flightController.searchFlights);
router.post("/book", flightController.bookFlight);

module.exports = router;
