const userModel = require('../models/userModel');

function register(req, res) {
    const { name, surname, email, password } = req.body;

    if(!name || !surname || !email || !password) {
        res.status(400).send('Preencha todos os dados');
    } else {
        userModel.register(name, surname, email, password).then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        });
    }
}

function login(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).send('Preencha todos os dados');
    } else {
        userModel.login(email, password).then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        });
    }
}

module.exports = {
    register,
    login
}