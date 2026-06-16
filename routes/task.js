const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const taskCtrl = require('../controllers/task');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/dataValid');


//Récupère tous
router.get('/taskGetAll', auth, validate.validateProject, taskCtrl.getAllTask);

//Met tous
router.post('/taskCreate', auth, validate.validateProject,multer, taskCtrl.createTask);

//Récupère en fonction de l'id
router.get('/:id', auth, validate.validateProject,taskCtrl.idTask);

//Mettre à jour
router.patch('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, taskCtrl.modifyTask);

//Supprimer en fonction de l'id
router.delete('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, taskCtrl.idDeleteTask);




module.exports = router; //Export des données



