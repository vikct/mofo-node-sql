import express from 'express';
import mysql from 'mysql';

import config from '../../config/config';
import user from './user.route';
import article from './article.route';

const router = express.Router();

// Returning routes requested via /api
router.get('/', (req, res) => {
  res.send(`passing through localhost:${config.port}/api`);
});

// Users
router.use('/user', user);
// Articles
router.use('/article', article);

// Testing mysql connection
router.get('/ping', (req, res) => {
  const connectionPool = mysql.createPool({
    connectionLimit: 10, // Limiting concurrent connection
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
  });
  // catching possible connection error
  connectionPool.getConnection((err, connection) => {
    if (err) {
      res.send(err);
      console.log('Failed to connect to mysql');
    } else {
      res.send('Connection to mysql is successful');
      console.log(connection);
    }
  });
});

export default router;
