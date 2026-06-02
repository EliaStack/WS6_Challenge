const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Veuillez vous connecter' });

    //Récup du token   
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); //Mettre la clé secrete pour décoder le mdp haché
        console.log("CONTENU RÉEL DU TOKEN DÉCODÉ :", decodedToken);
        const userId = decodedToken.userId;
        const role = decodedToken.role;

        req.auth = {
            userId: userId,
            role: role
        };
        console.log("--- DEBUG AUTH ---", req.auth);
        next();
    } catch (error) {
        res.status(401).json({ error });
        console.log('Veuillez vous connecter');
    }
};











