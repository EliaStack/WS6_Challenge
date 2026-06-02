const Project = require('../models/project'); //Import du modèle de schéma thing 
const fs = require('fs'); //Créer des fichiers sur le système

//Fonction GET - Récupère tous
exports.getAllProject = (req, res, next) => {
    Project.find() //Trouver tt les things
        .then(things => res.status(200).json(things)) //Récup tableaux des things
        .catch(error => res.status(400).json({ error }));
};


//Fonction POST - Met tous/Création
exports.createProject = (req, res, next) => {
    const projectObject = req.body;
    const project = new Project({
        ...projectObject,
        userId: req.auth.userId
    });

    project.save()
        .then(() => { res.status(201).json({ message: 'Projet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
}

//Fonction PUT - Mettre à jour
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId;
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Fonction Delete - Supprimer en fonction de l'id
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

//Fonction GET - Récupère en fonction de l'id
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};




//Add try catch ds les fct
//try {
//   Thing.find() //Trouver tt les things
//    res.status(200).json(things) //Récup tableaux des things
//} catch (err) {
//   res.status(500).json({ error: 'Erreur lors de l arécupération des projets' })
//};