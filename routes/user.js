const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Route pour l'insertion
router.post('/userCreate', userCtrl.createUser);

// Route pour la lecture
router.get('/userGet', userCtrl.getAllUsers);

router.post('/login',userCtrl.login);


module.exports = router;