module.exports = (role) => {
    return (req, res, next) => {
        // Vérifie si le rôle de l'utilisateur correspond au rôle requis
        if (req.auth && req.auth.role === role) {
            next();
        } else {
            res.status(403).json({ message: "Accès refusé : rôle insuffisant." });
        }
    };
};