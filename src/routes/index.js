const express = require("express");
const router = express.Router();
const fligthRouter = require("./fligth.route");

router.use("/fligth", fligthRouter);

module.exports = router;
