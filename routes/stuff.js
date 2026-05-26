const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff'); //Import du fichier js controllers


//Met tous
//router.post('/', auth, multer, stuffCtrl.createThing); //Apelle de la fct createThing


//Mettre à jour
//router.put('/:id', auth, multer, stuffCtrl.modifyThing); //Appele de la fct modifyThing

//Supprimer en fonction de l'id
//router.delete('/:id', auth, checkRole('ROLE_MANAGER'), stuffCtrl.deleteThing);

//Récupère en fonction de l'id
//router.get('/:id', auth, stuffCtrl.getOneThing);

//Récupère tous
//router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router; //Export des données















