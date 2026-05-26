const mongoose = require('mongoose');

const connectDB = async () => {
    try { //Sa peut prendre du temps donc try/await
        await mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ws6-oc.k1ttgr3.mongodb.net/test')
            console.log('Connexion à MongoDB réussie !')
    } catch (err) {
        console.log('Connexion à MongoDB échouée !');
        console.error(err); // <== AJOUTEZ CETTE LIGNE
    };
};

module.exports = connectDB; 
