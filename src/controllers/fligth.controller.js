const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");
const Flight = require("../models/fligth.model");

function findCityOrTimeZone(iataCode) {
  return new Promise((resolve, reject) => {
    let cityOrTimeZone = null;
    fs.createReadStream(path.resolve(__dirname, "iata.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        if (row.code === iataCode) {
          cityOrTimeZone = row.city || row.time_zone_id;
        }
      })
      .on("error", reject)
      .on("end", () => {
        resolve(cityOrTimeZone);
      });
  });
}

async function generateFlight() {
  let airportDepart = faker.airline.airport();
  let airportArrive = faker.airline.airport();

  const cityDepart = await findCityOrTimeZone(airportDepart.iataCode);
  const cityArrive = await findCityOrTimeZone(airportArrive.iataCode);

  // Add cityDepart and cityArrive to airport_depart and airport_arrive objects respectively
  airportDepart = { ...airportDepart, city: cityDepart };
  airportArrive = { ...airportArrive, city: cityArrive };

  return {
    airport_depart: airportDepart,
    airport_arrive: airportArrive,
    date_depart: faker.date.soon(),
    date_arrive: faker.date.soon({ days: 30 }),
    prix: faker.commerce.price({ min: 200, max: 900, dec: 2, symbol: "€" }),
    thumbnail: faker.image.urlLoremFlickr({ category: "city" }),
  };
}

exports.addFligth = async (req, res, next) => {
  try {
    for (let i = 0; i < req.query.index; i++) {
      const flightData = await generateFlight();
      console.log(flightData, i);

      const flight = new Flight(flightData);
      await flight.save();
    }
    res.send("Flights added successfully.");
  } catch (error) {
    console.error("Error adding flights:", error);
    res.status(500).send("Error adding flights.");
  }
};

exports.deleteAllfligth = async (req, res, next) => {
  try {
    await Flight.deleteMany();
    res.send("All flights deleted successfully.");
  } catch (error) {
    console.error("Error deleting flights:", error);
    res.status(500).send("Error deleting flights.");
  }
};
