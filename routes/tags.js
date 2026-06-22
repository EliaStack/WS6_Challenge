const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const tagstCtrl = require('../controllers/tags'); //Import du fichier js controllers


/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Récupère un tag par son identifiant
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag trouvé
 *       404:
 *         description: Tag introuvable
 */
//Récupère en fonction de l'id
router.get('/:id',tagstCtrl.idTags);


/**
 * @swagger
 * /api/tags/tagCreate:
 *   post:
 *     summary: Créer un nouveau tag
 *     tags:
 *       - Tags
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
 *                 example: Urgent
 *     responses:
 *       201:
 *         description: Tag créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
//Création du tag 
router.post('/tagCreate',auth,multer, tagstCtrl.createTags);


/**
 * @swagger
 * /api/tags/{id}:
 *   patch:
 *     summary: Modifier un tag
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tag modifié avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Tag introuvable
 */
//Modifier le tag 
router.patch('/:id', multer, tagstCtrl.modifyTags);


/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Supprimer un tag
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tag supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Tag introuvable
 */
//Supprimer un tag
router.delete('/:id', multer, tagstCtrl.deleteTags);

module.exports = router; //Export des données










