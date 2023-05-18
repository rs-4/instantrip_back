const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require("cors");
apiRouter = require("./routes");
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://Dev:Dev@instantrip.vxyhvdv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("successfully connect to database");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use("/api/", apiRouter);

app.listen(process.env.PORT, function () {
  console.log("Server launch");
});
