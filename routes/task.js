const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const taskCtrl = require('../controllers/task');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



//Récupère tous 
router.get('/taskGetAll', taskCtrl.getAllTask);

//Création 
router.post('/taskCreate',multer, taskCtrl.createTask);

//Récupère en fonction de l'id 
router.get('/:id',taskCtrl.idTask);

//Mettre à jour 
router.patch('/:id', multer, taskCtrl.modifyTask);

//Supprimer en fonction de l'id
router.delete('/:id', multer, taskCtrl.idDeleteTask);

// Associer un tag à une tâche 
router.post('/:taskId/tags/add/:id', multer, taskCtrl.addTagToTask);

// Dissocier un tag d'une tâche
router.delete('/:taskId/tags/remove/:id', multer, taskCtrl.removeTagFromTask);


module.exports = router; //Export des données



