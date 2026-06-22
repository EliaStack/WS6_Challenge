const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/dataValid');
const projectCtrl = require('../controllers/project'); //Import du fichier js controllers


//Endpoints REST


/**
 * @swagger
 * /api/projet/projetGetAll:
 *   get:
 *     summary: Récupère tous les projets
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des projets récupérée avec succès
 *       401:
 *         description: Utilisateur non authentifié
 */
//Récupère tous
router.get('/projetGetAll', auth, validate.validateProject, projectCtrl.getAllProject);


/**
 * @swagger
 * /api/projet/projetCreate:
 *   post:
 *     summary: Créer un projet
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Projet créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Utilisateur non authentifié
 */
//Met tous
router.post('/projetCreate', auth, validate.validateProject,multer, projectCtrl.createProject);


/**
 * @swagger
 * /api/projet/{id}:
 *   get:
 *     summary: Récupère un projet par son identifiant
 *     tags:
 *       - Projects
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
 *         description: Projet trouvé
 *       404:
 *         description: Projet introuvable
 */
//Récupère en fonction de l'id
router.get('/:id', auth, validate.validateProject,projectCtrl.idProject);


/**
 * @swagger
 * /api/projet/{id}:
 *   patch:
 *     summary: Modifier un projet
 *     tags:
 *       - Projects
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
 *         description: Projet modifié
 *       401:
 *         description: Utilisateur non authentifié
 *       403:
 *         description: Accès refusé (ROLE_MANAGER requis)
 *       404:
 *         description: Projet introuvable
 */
//Mettre à jour
router.patch('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.modifyProject);


/**
 * @swagger
 * /api/projet/{id}:
 *   delete:
 *     summary: Supprimer un projet
 *     tags:
 *       - Projects
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
 *         description: Projet supprimé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Projet introuvable
 */
//Supprimer en fonction de l'id
router.delete('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.idDeleteProject);


/**
 * @swagger
 * /api/projet/{id}:
 *   post:
 *     summary: Ajouter un membre au projet
 *     tags:
 *       - Projects
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
 *         description: Membre ajouté
 *       403:
 *         description: Accès refusé
 */
//Ajouter un membre si les droits
router.post('/:id', auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.addMembersProject);


/**
 * @swagger
 * /api/projet/members/{id}:
 *   delete:
 *     summary: Supprimer un membre du projet
 *     tags:
 *       - Projects
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
 *         description: Membre supprimé
 *       403:
 *         description: Accès refusé
 */
//Supprimer un membre si les droits
router.delete('/members/:id',auth, validate.validateProject, checkRole('ROLE_MANAGER'), multer, projectCtrl.deleteMembersProject);




module.exports = router; //Export des données















