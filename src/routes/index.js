const express = require("express");
const router = express.Router();
const fligthRouter = require("./fligth.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");

router.use("/fligth", fligthRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
