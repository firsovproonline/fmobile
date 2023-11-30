import connectionMysql from '../config/mysql';
import IProduct from "../interfaces/product.interface";

export default {
    async createTable(){
        const query = `CREATE TABLE fmobile.product (
          id int UNSIGNED NOT NULL AUTO_INCREMENT,
          email varchar(50) DEFAULT NULL,
          title varchar(255) DEFAULT NULL,
          body varchar(1024) DEFAULT NULL,
          video varchar(255) DEFAULT NULL,
          date int DEFAULT NULL,
          cost float DEFAULT NULL,
          img1 mediumblob DEFAULT NULL,
          img2 mediumblob DEFAULT NULL,
          img3 mediumblob DEFAULT NULL,
          img4 mediumblob DEFAULT NULL,
          UNIQUE INDEX UK_product_id (id)
        )
        ENGINE = INNODB,
        CHARACTER SET utf8mb4,
        COLLATE utf8mb4_0900_ai_ci;`
        const e = await connectionMysql.execute(query);
        return e;
    },
    async findAllProduct() {
        const queryTotal = 'SELECT count(id) as total FROM product';
        const [total] = await connectionMysql.execute(queryTotal);
        const query = `SELECT
                  product.title,
                  product.id,
                  product.body,
                  product.date,
                  master.phone,
                  master.firstName
                FROM product
                  INNER JOIN master
                    ON product.email = master.email ORDER BY product.id DESC`
        const [data] = await connectionMysql.execute(query);
        return {rows: data as any, total: total[0].total as number}   ;
    },
    async findProduct(email:string) {
        const query = `SELECT * FROM product WHERE email='`+email+`'`;
        const [data] = await connectionMysql.execute(query);
        return  data[0];
    },
    async updateProduct(data: any) {
        let query = `UPDATE product SET `
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
        const [out] = await connectionMysql.execute(query, [data]);
        return out
    },
    async addProduct(data: any) {
        let query = "INSERT INTO product (email,status,title,body,date,img1,img2,img3,img4) VALUES ('"+
            data.email+"','"+
            0+"','"+
            data.title+"','"+
            data.body+"','"+
            data.date+"','"+
            data.img1+"','"+
            data.img2+"','"+
            data.img3+"','"+
            data.img4+"'"+
            ")";
        const [out] = await connectionMysql.execute(query);
        return out as IProduct[];
    },
}