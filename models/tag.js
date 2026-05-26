const mongoose = require('mongoose');
const project = require('./project');

const tagModel = new mongoose.Schema({
    name: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true} ,
});

module.exports = mongoose.model('tag', tagModel);

