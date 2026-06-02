const mongoose = require('mongoose');
const user = require('./user');

const projectModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startAt:{type: Date, require:true, default: Date.now},
    endAt:{type:Date, required:false},
    status:{type: String}, //actif/archivé
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}]
});


module.exports = mongoose.model('project', projectModel); //Exporter le modèle avec les données


