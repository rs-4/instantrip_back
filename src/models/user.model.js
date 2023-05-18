const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 50,
        minLength: 2
      },
    lastName: {
        type: String,
        lowercase: true,
        maxLength: 50,
        minLength: 2,
        required: true
      },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        length: 50,
        required: true
      },
    phone: {
        type: String,
        maxLength: 15,
        minLength: 9,
        required: true
      },
    password: {
        type: String,
        required: true
      },
    flight: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Flight',
      },
})

const User = mongoose.model("User", userSchema);

module.exports = User;