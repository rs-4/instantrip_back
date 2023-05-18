const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airport_depart: {
    cityDepart: String,
    name: String,
    iataCode: String,
  },
  airport_arrive: {
    cityArrive: String,
    name: String,
    iataCode: String,
  },
  date_depart: Date,
  date_arrive: Date,
  prix: String,
  thumbnail: String,
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
