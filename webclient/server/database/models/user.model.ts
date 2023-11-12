import connectionMysql from '../config/mysql';
import IUser from '../interfaces/user.interface';

export default {
  async createTable(){
    const query = `CREATE TABLE fmobile.user (
      id int UNSIGNED NOT NULL AUTO_INCREMENT,
      uid varchar(64) DEFAULT NULL,
      firstName varchar(255) DEFAULT NULL,
      lastName varchar(255) DEFAULT NULL,
      admin tinyint(1) DEFAULT 0,
      email varchar(50) DEFAULT NULL,
      password varchar(500) DEFAULT NULL,
      PRIMARY KEY (id)
    )
    ENGINE = INNODB,
    AUTO_INCREMENT = 0,
    CHARACTER SET utf8mb4,
    COLLATE utf8mb4_0900_ai_ci;`
    const e = await connectionMysql.execute(query);
    return e;
  },
  async findAllUser() {
    const query = 'SELECT * FROM user';
    const [users] = await connectionMysql.execute(query);
    return users as IUser[];
    // return users;
  },
  async addUser(user: string) {
    const query = "INSERT INTO user (user) VALUES (?)";
    const [users] = await connectionMysql.execute(query, [user]);
    return users as IUser[];
    // return users;
  },
}