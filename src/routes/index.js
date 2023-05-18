const express = require("express");
const router = express.Router();
const fligthRouter = require("./fligth.route");
const authRouter = require("./auth.route");

router.use("/fligth", fligthRouter);
router.use("/auth", authRouter);

module.exports = router;
