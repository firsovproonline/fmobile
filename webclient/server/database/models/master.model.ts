import connectionMysql from '../config/mysql';
import IMaster from '../interfaces/master.interface';

export default {
    async createTable(){
        const query = `CREATE TABLE fmobile.master (
      id int UNSIGNED NOT NULL AUTO_INCREMENT,
      uid varchar(64) DEFAULT NULL,
      firstName varchar(255) DEFAULT NULL,
      lastName varchar(255) DEFAULT NULL,
      lastName varchar(255) DEFAULT NULL,
      photo varchar(50) DEFAULT NULL,
      profession varchar(50) DEFAULT NULL,
      phone varchar(50) DEFAULT NULL,
      avito varchar(500) DEFAULT NULL,
      status int DEFAULT 0,
      PRIMARY KEY (id)
    )
    ENGINE = INNODB,
    AUTO_INCREMENT = 0,
    CHARACTER SET utf8mb4,
    COLLATE utf8mb4_0900_ai_ci;`
        const e = await connectionMysql.execute(query);
        return e;
    },
    async findAllMaster(q: any) {
        let WHERE = ``
        if (q.q && q.q !== '' && q.q !=='undefined'){
            WHERE += ` (firstname like '%`+q.q+`%'`
                + ` OR lastName like '%`+q.q+`%'`
                + ` OR profession like '%`+q.q+`%'`
                + ` OR phone like '%`+q.q+`%'`
                + `)`
        }
        if(q.email && q.email !== '' && q.email !== 'undefined'){
            if (WHERE !== ''){
                WHERE += ' AND '
            }
            WHERE += ` (email = '`+q.email+`')`
        }
        if(q.status && q.status != 1 && q.status !== 'undefined'){
            if (WHERE !== ''){
                WHERE += ' AND '
            }
            WHERE += ` (status = '`+q.status+`')`
        }

        if(WHERE!==''){
            WHERE = ` WHERE ` + WHERE
        }
        console.log('WHERE', WHERE)
        const queryTotal = 'SELECT count(id) as total FROM master '+WHERE;
        const [total] = await connectionMysql.execute(queryTotal);
        const query = 'SELECT * FROM master '+WHERE;
        const [masters] = await connectionMysql.execute(query);
        return {rows: masters as IMaster[], total: total[0].total as number}   ;
    },
    async findMaster(email:string) {
        const query = `SELECT * FROM master WHERE email='`+email+`'`;
        const [master] = await connectionMysql.execute(query);
        return  master[0];
    },
    async updateMaster(master: any) {
        console.log(master)
        const queryTotal = `SELECT count(id) as total FROM master  WHERE email='`+master.email+`'`
        const [total] = await connectionMysql.execute(queryTotal);
        if([total][0][0].total ==0){
            let query = "INSERT INTO master (email,phone,profession,firstName,lastName,photo) VALUES ('"+
                master.email+"','"+
                master.phone+"','"+
                master.profession+"','"+
                master.firstName+"','"+
                master.lastName+"','"+
                master.photo+"'"+
                ")";
            const [masters] = await connectionMysql.execute(query);
            return masters as IMaster[];
        }else{
            let query = `UPDATE master SET `
            for(let key in master){
                if(query!==`UPDATE master SET `) query+=`,`
                if(key !=='email' && key !=='id' && key !=='uid'){
                    if(master[key] !== null )
                        query += ` `+key +`='`+master[key]+`' `
                    else
                        query += ` `+key +`=`+master[key]+' '
                }
            }
            query += ` WHERE email='`+master.email+`'`
            console.log('POSTMASTER', query)
            const [masters] = await connectionMysql.execute(query, [master]);
            return masters
        }
    },
    async addMaster(master: string) {
        const query = "INSERT INTO master (master) VALUES (?)";
        const [masters] = await connectionMysql.execute(query, [master]);
        return masters as IMaster[];
        // return users;
    },
}