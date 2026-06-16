const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/dataValid');
const projectCtrl = require('../controllers/project'); //Import du fichier js controllers


//Endpoints REST

//Récupère tous
router.get('/projetGetAll', auth, validate.validateProject, projectCtrl.getAllProject);

//Met tous
router.post('/projetCreate', auth, validate.validateProject,multer, projectCtrl.createProject);

//Récupère en fonction de l'id
router.get('/:id', auth, validate.validateProject,projectCtrl.idProject);

//Mettre à jour
router.patch('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.modifyProject);

//Supprimer en fonction de l'id
router.delete('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.idDeleteProject);

//Ajouter un membre si les droits
router.post('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.addMembersProject);

//Supprimer un membre si les droits
router.delete('/members/:id',auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.deleteMembersProject);




module.exports = router; //Export des données















