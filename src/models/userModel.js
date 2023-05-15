var database = require('../database/config');

function register(name, surname, email, password) {
    const query = `INSERT INTO user (name, surname, email, password) VALUES ('${name}', '${surname}', '${email}', '${password}')`;

    return database.execute(query);
}

function login(email, password) {
    const query = `SELECT * FROM user WHERE email='${email}' AND password='${password}'`;

    return database.execute(query);
}

module.exports = {
    register,
    login
}