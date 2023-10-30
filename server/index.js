const {Sequelize, Op, fn} = require("sequelize");
const sqlite3 = require('sqlite3')
const express = require('express')
const mysql = require("mysql")
const http = require('http')
const app = express()
const config = require("./api/config/db.config.js");
const promiseAR = [];
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "fmobile",
    password: "12345",
    database: 'fmobile',
    debug: false,
    multipleStatements: true
});
connection.connect();

let db = {}
async function updateCalldate(db,item){
    let sql = `UPDATE impressions SET calldate = `+item.start_time+` WHERE JSON_EXTRACT(\`phone\`,'$') LIKE '%`+item.client_number+`%'`
    return await db.sqlite.query(sql)
}

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
            retry: {
                match: [/Deadlock/i, Sequelize.ConnectionError], // Retry on connection errors
                max: 3, // Maximum retry 3 times
                backoffBase: 3000, // Initial backoff duration in ms. Default: 100,
                backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
            },
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
                console.log('Импорт звонков начало')
                let sql = "SELECT * FROM callzvon"
                db.sequelizeMysql.query(sql).then(rows=>{
                     db.rent21moiZvonki.bulkCreate(rows[0]).then(()=>{
                        let totalR =  0
                        let allSql = ''
                        let uids = {}
                        rows[0].forEach(item=>{
                            if(!uids[item.client_number]){
                                uids[item.client_number] = 1
                                if(item.client_number && item.client_number!='+' && item.client_number!='' && item.client_number.length > 2 ){
                                    allSql+=`UPDATE impressions SET calldate = `+item.start_time+` WHERE JSON_EXTRACT(\`phone\`,'$') LIKE '%`+item.client_number+`%';`
                                    totalR++
                                }
                            }
                        })
                        connection.query(allSql, [], function(err, result) {
                            if (result) {
                                console.log('Завершение синхронизации звонков и клиентов',totalR)
                            }
                            else {
                                console.log('error',err)
                            }
                        })
                    })
                })
            })
        })
    }
)

