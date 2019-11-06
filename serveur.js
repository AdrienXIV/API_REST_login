const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;


// Midleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

//récupérer les fichiers html sans utiliser les extensions 
app.use(express.static(__dirname + '/', {
    extensions: ['html']
}));


app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    })
});


// MongoDB connexion
const db = "zenmoov";
const mongoURI = "mongodb://localhost/" + db;

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log("Connexion à MongoDB réussi"))
    .catch(err => console.log(err));


const Users = require('./routes/Users');

app.use('/users', Users);

app.listen(port, function () {
    console.log("Serveur lancé sur le port " + port);
});

