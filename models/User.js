const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = "identifiants";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model(collection, UserSchema); // modèle mongodb