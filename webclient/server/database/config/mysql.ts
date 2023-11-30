import mysql2 from 'mysql2/promise';

const connectionMysql: any = mysql2.createPool({
    host: '127.0.0.1',
    user: 'android',
    password: '12345',
    database: 'fmobile',
    multipleStatements: true
});

export default connectionMysql;