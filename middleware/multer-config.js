const multer = require('multer');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


//Objet de configuration pour multer
const storage = multer.diskStorage({ //Enregister sur le disque
    destination: (req, file, callback) => {
        callback(null, 'images') //'image'=dossier ou ce sera rangé
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); //Sa élimine le pb des espaces
        const extension = MIME_TYPES[file.mimetype]; //Correspond au mimetype envoyé par le frontend
        callback(null, name + Date.now() + '.' + extension); //Création du nom de fichier
    }
});

module.exports = multer({ storage: storage }).single('image'); //single=fichier unique, image=ne transporte que les images