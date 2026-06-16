const task = require('../models/task');
const Task = require('../models/task');

//Fonction GET - Récupère tous
exports.getAllTask = (req, res, next) => {
    Project.find() //Trouver tt 
        .then(things => res.status(200).json(things)) //Récup tableaux
        .catch(error => res.status(400).json({ error }));
};

//Fonction POST - Met tous/Création
exports.createTask = (req, res, next) => {
    const taskObject = req.body;
    const task = new Task({
        ...taskObject,
        userId: req.auth.userId
    });

    task.save()
        .then(() => { res.status(201).json({ message: 'Tâche enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
}

//Fonction GET - Récupère en fonction de l'id
exports.idTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//Fonction PUT - Mettre à jour si c'est un manager
exports.modifyTask = (req, res, next) => {
    const taskObject = req.file ? {
        ...JSON.parse(req.body.task),
    } : { ...req.body };

    delete taskObject._userId;

    Task.findOne({ _id: req.params.id })
        .then((task) => {
            console.log(task);
            if (task.owner != req.auth.userId) {
                res.status(401).json({ message: 'Modification de la tâche non autorisé' });
            } else {
                Task.updateOne({ _id: req.params.id }, { ...taskObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Tâche modifiée!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Fonction Delete - Supprimer en fonction de l'id
exports.idDeleteTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
        .then(task => {
            if (task.owner != req.auth.userId) {
                res.status(401).json({ message: 'Suppression de la tâche non autorisé' });
            } else {
                Task.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Tâche supprimée !' }) })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};







