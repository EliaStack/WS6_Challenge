const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 1. Action pour INSÉRER un utilisateur (POST)
exports.createUser = (req, res, next) => {
    // On crée une instance du modèle 'user' avec les données reçues du body
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password, 
        roles: req.body.roles || ["ROLE_USER"]
    });

    // Enregistrement dans la base MongoDB Atlas (dans la base 'challenge')
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !', data: user }))
        .catch(error => res.status(400).json({ error }));
};

// 2. Action pour LIRE les utilisateurs (GET)
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};



