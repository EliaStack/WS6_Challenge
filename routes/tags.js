const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const tagstCtrl = require('../controllers/tags'); //Import du fichier js controllers


//Récupère en fonction de l'id
router.get('/:id',tagstCtrl.idTags);

//Création du tag
router.post('/tagCreate',auth,multer, tagstCtrl.createTags);

//Mettre à jour
router.patch('/:id', multer, tagstCtrl.modifyTags);

//Supprimer un tag
router.delete('/:id', multer, tagstCtrl.deleteTags);

module.exports = router; //Export des données










