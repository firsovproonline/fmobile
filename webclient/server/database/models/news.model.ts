import connectionMysql from '../config/mysql';
import INews from "../interfaces/news.interface";

export default {
    async createTable(){
        const query = `CREATE TABLE fmobile.news (
            id int UNSIGNED NOT NULL AUTO_INCREMENT,
            title varchar(255) DEFAULT NULL,
            body varchar(1024) DEFAULT NULL,
            video varchar(255) DEFAULT NULL,
            date int DEFAULT 0,
            img1 blob DEFAULT NULL,
            img2 blob DEFAULT NULL,
            img3 blob DEFAULT NULL,
            img4 blob DEFAULT NULL,
            PRIMARY KEY (id)
        )
        ENGINE = INNODB,
        AUTO_INCREMENT = 0,
        CHARACTER SET utf8mb4,
        COLLATE utf8mb4_0900_ai_ci;`
        const e = await connectionMysql.execute(query);
        return e;
    },
    async findAllNews() {
        const queryTotal = 'SELECT count(id) as total FROM news';
        const [total] = await connectionMysql.execute(queryTotal);
        const query = 'SELECT * FROM news ORDER BY id DESC';
        const [masters] = await connectionMysql.execute(query);
        return {rows: masters as INews[], total: total[0].total as number}   ;
    },
    async findNews(email:string) {
        const query = `SELECT * FROM news WHERE email='`+email+`'`;
        const [master] = await connectionMysql.execute(query);
        return  master[0];
    },
    async updateNews(data: any) {
        let query = `UPDATE news SET `
        for(let key in data){
            if(query!==`UPDATE master SET `) query+=`,`
            if(key !=='email' && key !=='id' && key !=='uid'){
                if(data[key])
                    query += ` `+key +`='`+data[key]+`' `
                else
                    query += ` `+key +`=`+data[key]+' '
            }
        }
        query += ` WHERE email='`+data.email+`'`
        const [masters] = await connectionMysql.execute(query, [data]);
        return masters
    },
    async addNews(data: any) {
        let query = "INSERT INTO news (title,body,date,img1,img2,img3,img4) VALUES ('"+
            data.title+"','"+
            data.body+"','"+
            data.date+"','"+
            data.img1+"','"+
            data.img2+"','"+
            data.img3+"','"+
            data.img4+"'"+
            ")";
        const [out] = await connectionMysql.execute(query);
        return out as INews[];
    },

}