const {Sequelize, Op, fn} = require("sequelize");
const sqlite3 = require('sqlite3')
const express = require('express')
const mysql = require("mysql")
const https = require('https')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs')

const app = express()
const cors = require("cors")
const config = require("./api/config/db.config.js");
const promiseAR = [];

const httpsOptions = {
    key: fs.readFileSync(__dirname + '/api/config/www.firsovpro.online.key'),
    cert: fs.readFileSync(__dirname + '/api/config/certificate.crt')
};

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "fmobile",
    password: "12345",
    database: 'fmobile',
    debug: false,
    multipleStatements: true
});
connection.connect();
const corsOptions = {
    origin: "*"
}

passport.serializeUser((user, done)=> {
    console.log(user)
        done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new YandexStrategy({
        clientID: config.YANDEX_CLIENT_ID,
        clientSecret: config.YANDEX_CLIENT_SECRET,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's Yandex profile is returned
            // to represent the logged-in user.  In a typical application, you would
            // want to associate the Yandex account with a user record in your
            // database, and return that user instead.
            return done(null, profile);
        });
    }
));


app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
}));



app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({
    extended: true
}));
//require('./routes/yandex')(app);


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
}));



app.use(passport.initialize());
app.use(passport.session());


app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 20 * 1024 * 10024 * 10024 //2MB max file(s) size
    },
}));

const db = require("../server/api/models/index.js");

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

//db.sequelizeMysql.sync({force: false}).then(()=>{
//    console.error('DB Rent21 старт')
//});

app.db = db
db.db3 = new sqlite3.Database('./api/db/fmobile.sqlite');

app.use((req, res, next)=> {
    res.db = app.db
    next();
});

app.get('/auth/yandex',
    passport.authenticate('yandex'),
    function(req, res){

        // The request will be redirected to Yandex for authentication, so this
        // function will not be called.
    });

app.get('/auth/yandex/callback',
    passport.authenticate('yandex', { failureRedirect: '/login' }),
    function(req, res) {
        //console.error('/auth/yandex/callback', req.query)
        res.redirect('http://192.168.1.21:3010');
    });

const server = https.createServer(httpsOptions, app).listen(3001);
require('./api/routes/main')(app);
require('./api/routes/master')(app);
console.error('Сервер старт')


Promise.all(promiseAR).then(
    result => {
        let sql = "SELECT * FROM lids";
/*
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

 */
    }
)

