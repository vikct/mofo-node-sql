import mysql from 'mysql';

import config from './config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlDatabase
});

export default connectionPool;
