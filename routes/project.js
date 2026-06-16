const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const multer = require('../middleware/multer-config');

const projectCtrl = require('../controllers/project'); //Import du fichier js controllers

//Endpoints REST

//Récupère tous
router.get('/projetGetAll', auth, projectCtrl.getAllProject);

//Met tous
router.post('/projetCreate', auth, multer, projectCtrl.createProject);

//Récupère en fonction de l'id
router.get('/:id', auth, projectCtrl.idProject);

//Mettre à jour
router.patch('/:id', auth, checkRole('ROLE_MANAGER'), multer, projectCtrl.modifyProject);

//Supprimer en fonction de l'id
router.delete('/:id', auth, checkRole('ROLE_MANAGER'), multer, projectCtrl.idDeleteProject);






module.exports = router; //Export des données















