const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); //Lié à npm install --save mongoose-unique-validator
//évite d'avoirs plusieurs user avec la même ad.mail

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    roles: [{ type: String }]//rôles (ROLE_USER, ROLE_MANAGER)
});

userSchema.plugin(uniqueValidator.default || uniqueValidator);

module.exports = mongoose.model('user', userSchema);

//Actions : inscription, login, refresh, récupération du profil




