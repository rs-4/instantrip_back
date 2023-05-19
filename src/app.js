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
    `mongodb://Dev:Dev@ac-jliazid-shard-00-00.vxyhvdv.mongodb.net:27017,ac-jliazid-shard-00-01.vxyhvdv.mongodb.net:27017,ac-jliazid-shard-00-02.vxyhvdv.mongodb.net:27017/?ssl=true&replicaSet=atlas-bmyjkd-shard-0&authSource=admin&retryWrites=true&w=majority`
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
