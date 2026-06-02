module.exports = (role) => {
    return (req, res, next) => {
        console.log("--- DEBUG CHECKROLE ---", req.auth);
        // Vérifie si le rôle de l'utilisateur correspond au rôle requis
        if (req.auth && req.auth.role === role) {
            next();
        } else {
            res.status(403).json({ message: "Accès refusé : rôle insuffisant." });
        }
    };
};


//(req.auth && req.auth.role === role) {