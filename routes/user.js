const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Route pour l'insertion
router.post('/test', userCtrl.createUser);

// Route pour la lecture
router.get('/test', userCtrl.getAllUsers);

router.post('/login',userCtrl.login);


module.exports = router;