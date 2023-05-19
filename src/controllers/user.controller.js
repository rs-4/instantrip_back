const User = require("../models/user.model");
const sendEmail = require('../utils/sendMail');
const signJwt = require("../utils/signJwt");

// forgot password 
exports.forgotPassword = async (req, res, next) => {

  try {
    const email = req.body.email;
    if (!email) {
      const error = new Error("you must fill an email")
      error.status = 401
      throw error;
    }
    //create a specific token for reset password
    const tokenPassword = signJwt({ email: email });
    //send email to user
    sendEmail(email, "password reset", "", "Veuillez cliquer sur ce lien pour regénérer un nouveau mot de passe");
    //send token
    res.send({
      success: true,
      token: tokenPassword
    })
  }
  catch (err) {
    next(err);
  }

}

//reset password
exports.resetPassword = async (req, res, next) => {
  try {
    //find user
    const user = await User.findOne({ email: req.userToken.body.email });
    //update password property with new one
    user.password = req.body.password;
    //save in DB
    await user.save();
    //send success message
    res.send({
      message: "password successfully updated",
      success: true
    })
  }
  catch (err) {
    next(err);
  }
}