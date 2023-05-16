const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors')
const apiRouter = require('./routes');
const errorHandler = require('./middlewares/errorsHandling');
app.use(bodyParser.json())

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`, 
).then(() => {
  console.log("successfully connect to database")
}).catch(err=>console.log(err))

app.use(cors())
app.use("/api/v1", apiRouter)
app.use(errorHandler);


//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log("Server launch");
}); 

// Ajouter une route + controller spécifiquement pour la MAJ du mot de passe
// Appliquer le middleware mongoose .pre() pour hasher le mdp en base de données.
// Donc à chaque fois que le mdp va être modifié le middleware va déclencher le hashage du mdp.
// -> Déplacer le hash sur le controller