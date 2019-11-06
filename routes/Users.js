const express = require('express');
const users = express.Router();
const cors = require('cors');
const User = require('../models/User'); // objet contenant le modèle mongodb

users.use(cors());

// Requête pour une page d'inscription
users.post('/register', (req, res) => {
    const userData = {
        email: req.body.email,
        password: crypt(req.body.password)
    };

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {

                User.create(userData)
                    .then(user => {
                        res.json({
                            status: user.email + " enregistré !"
                        })
                    })
                    .catch(err => {
                        res.send('erreur : ' + err)
                    })

            } else {
                res.json({
                    error: "Utilisateur existant"
                });
            }
        })
        .catch(err => {
            res.send('erreur : ' + err);
        });
});



// Requete pour s'identifier
users.post('/login', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                // récupération du mdp de la bdd
                let pwd = user.password;

                if (req.body.password == decrypt(pwd)) {
                    res.json({
                        status: "les mots de passe correspondent.",
                        success: true,
                        id:user._id

                    })
                } else {
                    res.json({
                        status: 'les mots de passe ne correspondent pas !',
                        success: false
                    })
                }
            } else {
                res.json({
                    status: "Utilisateur inexistant.",
                    success: false
                })
            }
        })
        .catch(err => {
            res.send('erreur : ' + err)
        })
});


module.exports = users;




/* CHIFFREMENT MOT DE PASSE */

const crypto = require('crypto');

const algorithm = 'aes-192-cbc'; //algorithme de chiffrement
const password = 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3'; //clé de chiffrement

function decrypt(encrypted) {
    let key = crypto.scryptSync(password, 'salt', 24);
    let iv = Buffer.alloc(16, 0); // Initialisation du vector.

    let decipher = crypto.createDecipheriv(algorithm, key, iv); //déchiffrer, obligation de le réinitialiser pour éviter une erreur
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');

    decrypted += decipher.final('utf8');
    return decrypted;
}

function crypt(text) {
    let key = crypto.scryptSync(password, 'salt', 24);
    let iv = Buffer.alloc(16, 0); // Initialisation du vector.

    let cipher = crypto.createCipheriv(algorithm, key, iv); //chiffrer, obligation de le réinitialiser pour éviter une erreur
    let crypted = cipher.update(text, 'utf8', 'hex');

    crypted += cipher.final('hex');
    return crypted;
}