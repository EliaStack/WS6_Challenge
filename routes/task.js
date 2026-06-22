const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const taskCtrl = require('../controllers/task');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



/**
 * @swagger
 * /api/task/taskGetAll:
 *   get:
 *     summary: Récupère toutes les tâches
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 */
//Récupère tous 
router.get('/taskGetAll', taskCtrl.getAllTask);


/**
 * @swagger
 * /api/task/taskCreate:
 *   post:
 *     summary: Créer une tâche
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Créer les tests Jest
 *               description:
 *                 type: string
 *                 example: Développer les tests unitaires
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *       400:
 *         description: Données invalides
 */
//Création 
router.post('/taskCreate',multer, taskCtrl.createTask);


/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Récupère une tâche par identifiant
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tâche trouvée
 *       404:
 *         description: Tâche introuvable
 */
//Récupère en fonction de l'id 
router.get('/:id',taskCtrl.idTask);


/**
 * @swagger
 * /api/task/{id}:
 *   patch:
 *     summary: Modifier une tâche
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tâche modifiée avec succès
 *       404:
 *         description: Tâche introuvable
 */
//Mettre à jour 
router.patch('/:id', multer, taskCtrl.modifyTask);


/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Supprimer une tâche
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 *       404:
 *         description: Tâche introuvable
 */
//Supprimer en fonction de l'id
router.delete('/:id', multer, taskCtrl.idDeleteTask);


/**
 * @swagger
 * /api/task/{taskId}/tags/add/{id}:
 *   post:
 *     summary: Associer un tag à une tâche
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du tag
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag associé avec succès
 *       404:
 *         description: Tâche ou tag introuvable
 */
// Associer un tag à une tâche 
router.post('/:taskId/tags/add/:id', multer, taskCtrl.addTagToTask);


/**
 * @swagger
 * /api/task/{taskId}/tags/remove/{id}:
 *   delete:
 *     summary: Retirer un tag d'une tâche
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du tag
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag retiré avec succès
 *       404:
 *         description: Tâche ou tag introuvable
 */
// Dissocier un tag d'une tâche
router.delete('/:taskId/tags/remove/:id', multer, taskCtrl.removeTagFromTask);


module.exports = router; //Export des données



