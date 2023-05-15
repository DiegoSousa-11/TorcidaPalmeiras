var database = require('../database/config');

function register(name, surname, email, password) {
    var query = `INSERT INTO user(name, surname, email, password) VALUES ('${name}', '${surname}', '${email}', '${password}')`;

    return database.execute(query);
}

module.exports = {
    register
}