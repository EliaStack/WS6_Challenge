const task = require('../models/task');
const Task = require('../models/task');

//Fonction GET - Récupère toutes les tâches
exports.getAllTask = async (req, res, next) => {
    try {
        // 1. Récupération des paramètres de filtrage (étape 2)
        const { status, priority, dueAt, tags, assignee, sortBy, order } = req.query;
        let query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (dueAt) query.dueAt = dueAt;
        if (tags) query.tags = tags;
        if (assignee) query.assignee = assignee;

        // 2. Gestion de la pagination (les valeurs par défaut sont 1 et 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        // 3. Tri
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        // 4. Exécution : on compte le total, puis on récupère les données paginées
        const total = await Task.countDocuments(query);
        const tasks = await Task.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            tasks,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(400).json({ error });
    }
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
        { $pull: { tags: req.params.id } }
    )
        .then(() => res.status(200).json({ message: 'Tag dissocié !' }))
        .catch(error => res.status(400).json({ error }));
};





