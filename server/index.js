const {Sequelize, Op} = require("sequelize");
const sqlite3 = require('sqlite3')
const express = require('express')
const mysql = require("mysql")
const http = require('http')
const app = express()

let db = {}
db.db3 = new sqlite3.Database('./api/db/fmobile.sqlite');
db.db3.serialize(()=>{
    db.sqlite = new Sequelize({
        dialect: 'sqlite',
        storage: './api/db/fmobile.sqlite'
    });
    db.rent21moiZvonki = require("./api/models/rent21.callzvon.model.js")(db.sqlite, Sequelize);
    db.sqlite.sync({force: true}).then(()=>{
        console.error('DB старт')
    })
})
const httpsOptions = {};

const server = http.createServer(httpsOptions, app).listen(3001);
console.error('Сервер старт')
