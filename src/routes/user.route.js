const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", verifyToken, userController.resetPassword);

module.exports = router;