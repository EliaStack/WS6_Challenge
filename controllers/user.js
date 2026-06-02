const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 1. Action pour INSÉRER un utilisateur (POST)
exports.createUser = (req, res, next) => {
    // On crypte le mot de passe reçu dans le body
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                roles: req.body.roles || ["ROLE_USER"]
            });

            // Enregistrement dans la base MongoDB Atlas
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé avec succès !',
                    data: user
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// 2. Action pour LIRE les utilisateurs (GET)
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => { //Connecter des utilisateurs existants
    console.log("--- TEST LOGIN ---");
    console.log("Mot de passe reçu de Postman :", req.body.password);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            console.log('Test 4');
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                        } else {
                            res.status(200).json({
                                // Nécessaire pour l'auth des requêtes émises par le client
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id, role: user.roles },
                                    process.env.JWT_SECRET,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error }); // Erreur serveur
                    });
            }
        })
        .catch(error => {
            res.status(500).json({ error }); // Erreur serveur
        });
};

