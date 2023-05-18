const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const sendMail = require('../utils/sendMail');
const signJwt = require('../utils/signJwt');

exports.register = async (req, res, next) => {

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
    });
  
    try {
      // save email in DB
      const newUserToSave = await newUser.save();
      //create new Token
      let userToken = signJwt({
        id: newUserToSave._id,
      })
      if (userToken) {
        //send email to new user
        await sendMail(
          newUser.email,
          "Confirmation d'inscription",
          `Hello ${newUser.firstName}`,
          "Votre inscription est confirmée."
        );
        //return User
        return res.send({
          success: true,
          message: "User logged",
          auth: true,
          token: userToken
        })
      }
    }
    catch (err) {
      next(err);
    }
  
  }

  //login user
exports.login = async (req, res, next) => {
    try {
      //find a user
      const userLogged = await User.findOne({ email: req.body.email });
      //throw error if no user
      if (!userLogged) {
        const error = new Error("user not found")
        error.status = 404
        throw error;
      }
      //if no password throw error
      if (req.body.password != userLogged.password) {
        const error = new Error("password not valid")
        error.status = 401
        throw error;
      }
      //sign jwt
      let userToken = signJwt({
        id: userLogged._id
      })
      // return token
      return res.send({
        success: true,
        message: "User logged",
        auth: true,
        token: userToken
      })
    }
    catch (err) {
      next(err);
    }
}