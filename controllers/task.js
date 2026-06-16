const task = require('../models/task');
const Task = require('../models/task');

//Fonction GET - Récupère toutes les tâches
exports.getAllTask = (req, res, next) => {
    Task.find() //Trouver tt 
        .then(things => res.status(200).json(things)) //Récup tableaux
        .catch(error => res.status(400).json({ error }));
};

//Fonction POST - Création d'une tâche
exports.createTask = (req, res, next) => {
    const taskObject = req.body;
    const task = new Task({
        ...taskObject,
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

//Fonction PUT - Modifier 
exports.modifyTask = (req, res, next) => {
    const taskObject = req.file ? {
        ...JSON.parse(req.body.task),
    } : { ...req.body };

    Task.findOne({ _id: req.params.id })
        .then((task) => {
            Task.updateOne({ _id: req.params.id }, { ...taskObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Tâche modifiée!' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Fonction Delete - Supprimer en fonction de l'id
exports.idDeleteTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
        .then(task => {
            Task.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'Tâche supprimée !' }) })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// Associer un tag à une tâche (PUSH)
exports.addTagToTask = (req, res, next) => {
    Task.updateOne(
        { _id: req.params.taskId }, 
        { $push: { tags: req.params.id } } // Utilise req.params.id ici
    )
    .then(() => res.status(200).json({ message: 'Tag associé !' }))
    .catch(error => res.status(400).json({ error }));
};

// Dissocier un tag d'une tâche (PULL)
exports.removeTagFromTask = (req, res, next) => {
    Task.updateOne(
        { _id: req.params.taskId },
        { $pull: { tags: req.params.id} }
    )
        .then(() => res.status(200).json({ message: 'Tag dissocié !' }))
        .catch(error => res.status(400).json({ error }));
};





