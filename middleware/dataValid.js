const { param, body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Middleware qui vérifie si l'ID est un ObjectId valide (format MongoDB de 24 caractères)
const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id) && id.length === 24;

exports.validateProject = [
    // Valide l'ID présent dans l'URL (:id)
    param('id').custom(value => {
        if (!isMongoId(value)) throw new Error('ID de projet invalide');
        return true;
    }),
    // Valide l'ID membre dans le body (si présent)
    body('members').optional().custom(value => {
        if (!isMongoId(value)) throw new Error('ID membre invalide');
        return true;
    }),
    // Middleware pour retourner les erreurs s'il y en a
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];