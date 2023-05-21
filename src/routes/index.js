const express = require("express");
const router = express.Router();
const flightRouter = require("./flight.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");

router.use("/flight", flightRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
