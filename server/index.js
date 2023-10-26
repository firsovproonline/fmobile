const {Sequelize, Op} = require("sequelize");
const sqlite3 = require('sqlite3')
const express = require('express')
const mysql = require("mysql")
const http = require('http')
const app = express()
const config = require("./api/config/db.config.js");
const promiseAR = [];
let db = {}

// внешнее подключение
db.sequelizeMysql = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        logging: 0,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

promiseAR.push(new Promise(function(resolve, reject) {
//************** не менять !!!  ***********************
    db.sequelizeMysql.sync({force: false}).then(()=>{
        console.error('DB Rent21 старт')
        resolve()

    });
}));


db.db3 = new sqlite3.Database('./api/db/fmobile.sqlite');
promiseAR.push(new Promise(function(resolve, reject) {
//************** не менять !!!  ***********************
    db.db3.serialize(()=>{
        db.sqlite = new Sequelize('fmobile', 'fmobile','12345',{
            host: '127.0.0.1',
            dialect: 'mysql',
            operatorsAliases: 0,
            logging: 0,
            // storage: './api/db/fmobile.sqlite'
        });
        db.rent21moiZvonki = require("./api/models/rent21.callzvon.model.js")(db.sqlite, Sequelize);
        db.impression = require("./api/models/impressions")(db.sqlite, Sequelize);
        db.sqlite.sync({force: true}).then(()=>{
            console.error('DB старт')
            resolve()
        })
    })

}));

let server = {}
Promise.all(promiseAR).then(
    result => {
        const httpsOptions = {};
        server = http.createServer(httpsOptions, app).listen(3001);
        console.error('Сервер старт')
        let sql = "SELECT * FROM lids";
        db.sequelizeMysql.query(sql).then(rows=>{
            const out = {}
            rows[0].forEach(item=>{
                if(!out[item.UID]) out[item.UID] = {}
                out[item.UID]['uid'] = item.UID
                let city = '';
                if (item.TITLE =='GOROD' ) item.TITLE = 'city'
                if (item.TITLE =='TITLE' ) item.TITLE = 'title'
                if (item.TITLE =='METRO' ){
                    item.TITLE = 'underground'
                    if(item.VAL !== ''){
                        item.VAL = item.VAL.split('|')
                        let a = []
                        item.VAL.forEach(s=>{
                            s = s.trim()
                            if(s!=='') a.push(s)
                        })
                        item.VAL = a

                    }else{
                        item.VAL = []
                    }
                }
                if (item.TITLE =='DOSTUP' ){
                    item.TITLE = 'access'
                    if(item.VAL !== ''){
                        item.VAL = item.VAL.split('|')
                        let a = []
                        item.VAL.forEach(s=>{
                            s = s.trim()
                            if(s!=='') a.push(s)
                        })
                        item.VAL = a
                    }else{
                        item.VAL = []
                    }
                }
                if (item.TITLE =='TEL') {
                    item.TITLE = 'phone'
                    let tels = [];
                    let list = item.VAL.split('|')
                    list.forEach(telitem => {
                        let sublist = telitem.split(';')
                        sublist[0] = sublist[0].replace('(', '')
                        sublist[0] = sublist[0].replace(')', '')
                        sublist[0] = sublist[0].replace(' ', '')
                        sublist[0] = sublist[0].replace('-', '')
                        sublist[0] = sublist[0].replace('-', '')
                        const obtel = {
                            val: '+7' + sublist[0],
                            typ: sublist[1]
                        };
                        if (sublist[0] != '') {
                            tels.push(obtel)
                        }
                    })
                    item.VAL = tels
                }
                out[item.UID][item.TITLE] = item.VAL
            })
            db.impression.bulkCreate(Object.values(out)).then(() => {
                console.log('Импорт клиентов окончен')
            });
        })
    }
)

