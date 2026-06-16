const tags = require('../models/tag');
const Tags = require('../models/tag'); //Import du modèle de schéma 
const Project = require('../models/project'); //Import du modèle de schéma thing 


//Fonction GET - Récupère en fonction de l'id
exports.idTags = (req, res, next) => {
    Tags.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//Fonction POST - Créer un tag (si membre du projet)
exports.createTags = (req, res, next) => {
    const tag = new Tags({
        name: req.body.name,
        project: req.body.project
    });

    tag.save()
        .then(() => res.status(201).json({ message: 'Tag créé !' }))
        .catch(error => res.status(400).json({ error }));
};

//Fonction PUT - Mettre à jour
exports.modifyTags = (req, res, next) => {
    const tagsObject = { ...req.body };

    Tags.findOne({ _id: req.params.id })
        .then((tags) => {
            Tags.updateOne({ _id: req.params.id }, { ...tagsObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Tag modifiée !' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Fonction Delete - Suppression du tag
exports.deleteTags = (req, res, next) => {
    Tags.deleteOne({ _id: req.params.id })
        .then(() => { res.status(200).json({ message: 'Tag supprimé !' }) })
        .catch(error => { res.status(400).json({ error }) });
};