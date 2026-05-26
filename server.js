console.log('Création du serveur');

//Création du serveur
const http = require('http'); //importer le package http qui donne accès à http
const app = require('./app'); //Lien JS de l'appli

const normalizePort = val => { //normalizePort=renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne 
   const port = parseInt(val, 10);

   if (isNaN(port)) {
      return val;
   }
   if (port >= 0) {
      return port;
   }
   return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => { //errorHandler=recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
   if (error.syscall !== 'listen') {
      throw error;
   }
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges.');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use.');
         process.exit(1);
         break;
      default:
         throw error;
   }
};


const server = http.createServer(app); //Lien enter le serveur et l'application

server.on('error', errorHandler);
server.on('listening', () => {
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
   console.log('Listening on ' + bind);
});

//Attente des requêtes envoyées en écoutant le port
server.listen(port);

/////////////////////////////////////////////////////////////////////////////////////////////////////







