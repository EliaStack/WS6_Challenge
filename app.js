const mongoose = require('mongoose'); //Importer mongoose lié à MongoDB
const express = require('express'); //Importer express
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/project'); //Import des routes
const userRoutes = require('./routes/user');
const tagsRoutes = require('./routes/tags');
const taskRoutes = require('./routes/task');
const swagger = require('./swagger');

dotenv.config();

const connectDB=require('./config/db'); //Appel MongoDB
const { setup } = require('swagger-ui-express');

connectDB();


const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100,                 // 100 requêtes max
  message: {
    message: 'Trop de requêtes, réessayez plus tard.'
  }
});

const app = express();
app.use(limiter);
app.use(cors(
    {origin: 'http://localhost:3000'}
));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', userRoutes); //Enregistrement des routes, racine de tout ce qui est liée à l'authentification
app.use('/api/projet', projectRoutes); //Remettre le début de la route pour dire que stuffRoutes est envoyé à l'api stuff
app.use('/api/tags', tagsRoutes); 
app.use('/api/task', taskRoutes);

app.use('/api-docs', swagger.serve, swagger.setup);
//Séquence 1 
// Rendre l'application capable de lire du JSON

// LA ROUTE DE TEST (Retourne un message de bienvenue)
//app.get('/', (req, res) => {
//    res.status(200).json({ message: "Bienvenue sur l'API TaskFlow !" });
//});



module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node
