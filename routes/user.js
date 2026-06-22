const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


/**
 * @swagger
 * /api/users/userCreate:
 *   post:
 *     summary: Créer un utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Sonia
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               email:
 *                 type: string
 *                 example: sonia@test.fr
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */
// Route pour l'insertion
router.post('/userCreate', userCtrl.createUser);


/**
 * @swagger
 * /api/users/userGet:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
// Route pour la lecture
router.get('/userGet', userCtrl.getAllUsers);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authentification utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: sonia@test.fr
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login',userCtrl.login);


module.exports = router;