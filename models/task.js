const mongoose = require('mongoose');
const user = require('./user');

const projectTask = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueAt: { type: Date, require: true, default: Date.now },
    priority: { type: String, required: true }, //priorité (low/medium/high)
    status: { type: String }, //état (open, in_progress, closed)
    project: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true} ,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: "tag"}]
});


module.exports = mongoose.model('task', projectTask); //Exporter le modèle avec les données

//Actions : création (par créateur du projet), mise à jour (créateur ou assigné selon champ), 
// ouvrir/fermer (l'assigné peut clore/réouvrir), suppression (créateur)
