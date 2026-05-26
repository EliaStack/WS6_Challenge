const mongoose = require('mongoose'); //Importer mongoose lié à MongoDB
const express = require('express'); //Importer express
const dotenv = require('dotenv');

dotenv.config();

const connectDB=require('./config/db'); //Appel MongoDB

connectDB();

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


//Séquence 1 
// Rendre l'application capable de lire du JSON

// LA ROUTE DE TEST (Retourne un message de bienvenue)
//app.get('/', (req, res) => {
//    res.status(200).json({ message: "Bienvenue sur l'API TaskFlow !" });
//});



module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node
