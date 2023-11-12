const mysql = require("mysql");
const {Sequelize} = require("sequelize");
const config = require("../config/db.config");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "fmobile",
    password: "12345",
    database: 'fmobile',
    debug: false,
    multipleStatements: true
});
connection.connect();
const db = {}
db.connection = connection
db.sqlite = new Sequelize('fmobile', 'fmobile','12345',{
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
    logging: 0,
    retry: {
        match: [/Deadlock/i, Sequelize.ConnectionError], // Retry on connection errors
        max: 3, // Maximum retry 3 times
        backoffBase: 3000, // Initial backoff duration in ms. Default: 100,
        backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
    // storage: './api/db/fmobile.sqlite'
});
db.rent21moiZvonki = require("./rent21.callzvon.model.js")(db.sqlite, Sequelize);
db.impression = require("./impressions.js")(db.sqlite, Sequelize);
db.sqlite.sync({force: false}).then(()=>{
    console.error('запрос старт')
})

module.exports = db;
