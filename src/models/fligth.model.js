const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airport_depart: {
    city: String,
    name: String,
    iataCode: String,
  },
  airport_arrive: {
    city: String,
    name: String,
    iataCode: String,
  },
  date_depart: Date,
  date_return: Date,
  prix: String,
  thumbnail: String,
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
