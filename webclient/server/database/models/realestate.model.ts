import connectionMysql from '../config/mysql';
import IRealestate from "../interfaces/realestate.interface";

export default {
    async addRealestate(data: any) {
        data.fields = JSON.stringify(data.fields)
        let query = "INSERT INTO realestate (email,title,date,fields,img1,img2,img3,img4) VALUES ('"+
            data.email+"','"+
            data.title+"','"+
            data.date+"','"+
            data.fields+"','"+
            data.img1+"','"+
            data.img2+"','"+
            data.img3+"','"+
            data.img4+"'"+
            ")";
        console.log(query)
        const [out] = await connectionMysql.execute(query);
        return out as IRealestate[];
    },
    async getRealEstate(id:string) {
        const query = `SELECT * FROM realestate WHERE id=`+id;
        const [data] = await connectionMysql.execute(query);
        return  data[0];
    },
    async updateRealEstate(data: any) {
        let query = `UPDATE realestate SET `+
            ` img1='`+data.img1+`',`+
            ` img2='`+data.img2+`',`+
            ` img3='`+data.img3+`',`+
            ` img4='`+data.img4+`',`+
            ` date='`+data.date+`',`+
            ` fields='`+data.fields+`'`
        /*
        for(let key in data){
            if(query!==`UPDATE realestate SET `) query+=`,`
            if(key !=='email' && key !=='id' && key !=='uid'){
                if(data[key])
                    query += ` `+key +`='`+data[key]+`' `
                else
                    query += ` `+key +`=`+data[key]+' '
            }
        }

         */
        query += ` WHERE id='`+data.id+`'`
        //console.log(query)
        const [out] = await connectionMysql.execute(query, [data]);
        return out
    },

}