const project = require('../models/project');
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

//Fonction GET - Récupère en fonction de l'id
exports.idProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//Fonction PUT - Mettre à jour si c'est un manager
exports.modifyProject = (req, res, next) => {
    const projectObject = req.file ? {
        ...JSON.parse(req.body.project),
    } : { ...req.body };

    delete projectObject._userId;

    Project.findOne({ _id: req.params.id })
        .then((project) => {
            console.log(project);
            if (project.owner != req.auth.userId) {
                res.status(401).json({ message: 'Modification non autorisé' });
            } else {
                Project.updateOne({ _id: req.params.id }, { ...projectObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//Fonction Delete - Supprimer en fonction de l'id
exports.idDeleteProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
            if (project.owner != req.auth.userId) {
                res.status(401).json({ message: 'Suppression non autorisé' });
            } else {
                Project.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

//Fonction POST - Ajout d'un membre dans un projet
exports.addMembersProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then((project) => {
            // 1. Vérification des droits
            if (project.owner != req.auth.userId) {
                return res.status(403).json({ message: 'Ajout non autorisé' });
            }

            // 2. Utilisation de $addToSet pour ajouter l'ID au tableau sans doublon
            Project.updateOne(
                { _id: req.params.id },
                { $addToSet: { members: req.body.members } } // On ajoute uniquement l'ID du nouveau membre
            )
                .then(() => res.status(200).json({ message: 'Ajout terminé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};














//Add try catch ds les fct
//try {
//   Thing.find() //Trouver tt les things
//    res.status(200).json(things) //Récup tableaux des things
//} catch (err) {
//   res.status(500).json({ error: 'Erreur lors de l arécupération des projets' })
//};