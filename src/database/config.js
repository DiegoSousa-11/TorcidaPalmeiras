var mysql = require('mysql2');
var sql = require('mssql');

// AZURE (CLOUD)
var sqlServerConfig = {
    server: "SEU_SERVIDOR",
    database: "SEU_BANCO_DE_DADOS",
    user: "SEU_USUARIO",
    password: "SUA_SENHA",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
    }
}

//MYSQL WORKBENCH (LOCAL)
var mySqlConfig = {
    host: "localhost",
    database: "TorcidaPalmeiras",
    user: "aluno",
    password: "sptech",
};

function execute(query) {
    if(process.env.ENVIRONMENT_PROCESS === 'PRODUCTION') {
        return new Promise((resolve, reject) => {
            sql.connect(sqlServerConfig).then(() => {
                return sql.query(query);
            }).then((results) => {
                console.log(results);
                resolve(results.recordset);
            }).catch((error) => {
                reject(error);
                console.log(error);
            })

            sql.on('error', (error) => {
                return ('Error at sql server (Azure): ', error);
            })
        })
    } else if(process.env.ENVIRONMENT_PROCESS === 'DEVELOPMENT') {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(mySqlConfig);
            
            connection.connect();
            connection.query(query, (error, results) => {
                connection.end();

                if(error) {
                    reject(error);
                }

                console.log(results);
                resolve(results);
            });

            connection.on('error', (error) => {
                return ('Error at MySQL WORKBENCH (Local): ', error.sqlMessage);
            })
        });
    } else {
        return new Promise((resolve, reject) => {
            console.log('The environment is not defined at app.js');
            reject('The environment is not defined at app.js');
        });
    }
}

module.exports = {
    execute
}