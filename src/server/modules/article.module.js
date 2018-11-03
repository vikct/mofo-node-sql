import mysql from 'mysql';
import jwt from 'jsonwebtoken';

import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlDatabase
});

// [C]reate, [R]ead, [U]pdate, [D]elete, geddit?

// CREATE
const createArticle = (obj) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        // Reject connection error
        reject(connectionError);
      } else {
        const query = 'INSERT INTO article SET ?';
        connection.query(query, obj, (error, result) => {
          if (error) {
            console.error('Error in createArticle(): ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`Added 1 record of id: ${result.insertId} to article`);
          }
          connection.release();
        });
      }
    });
  });
};

// READ ALL
const readArticles = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'SELECT * FROM article WHERE is_active=1';
        connection.query(query, (error, result) => {
          if (error) {
            console.error('Error in readArticles(): ', error);
            reject(error);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
};

// READ SINGLE RECORD
const readArticle = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        // const query = `SELECT * FROM article WHERE id=${id}`;
        const query = 'SELECT * FROM article WHERE id=? AND is_active=1';
        connection.query(query, id, (error, result) => {
          if (error) {
            console.error('Error in readArticle(): ', error);
            reject(error);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
};

// UPDATE
const updateArticle = (obj, id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'UPDATE article SET ? WHERE id=? AND is_active=1';
        connection.query(query, [obj, id], (error, result) => {
          if (error) {
            console.error('Error in updateArticle(): ', error);
            reject(error);
          } else if (result.affectedRows === 0) {
            // If intended record is not exist
            resolve('Undefined Id provided');
          } else if (result.message.match('Changed: 1')) {
            resolve('Record updated successfully');
          } else {
            resolve('No changes being made');
          }
          connection.release();
        });
      }
    });
  });
};

// DELETE (SOFT)
const deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'UPDATE article SET is_active=0 WHERE id=?';
        connection.query(query, id, (error, result) => {
          if (error) {
            console.error('Error in deleteArticle(): ', error);
            reject(error);
          } else if (result.affectedRows === 0) {
            resolve('No such record exist');
          } else if (result.message.match('Changed: 1')) {
            resolve('Article removed sucessfully');
          } else {
            resolve('Article already being removed');
          }
          connection.release();
        });
      }
    });
  });
};

// DELETE (HARD)
const hardDeleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'DELETE FROM article WHERE id=?';
        connection.query(query, id, (error, result) => {
          if (error) {
            console.error('Error in hardDeleteArticle(): ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('Article removed successfully');
          } else {
            resolve('Failed to remove article');
          }
          connection.release();
        });
      }
    });
  });
};

const readPersonalArticle = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        connectionPool.getConnection((connectionError, connection) => {
          if (connectionError) {
            reject(connectionError);
          } else {
            // Once JWT verified, obtaining the userId
            const userId = decoded.payload.id;
            const query = 'SELECT * FROM article WHERE user_id=?';
            connection.query(query, userId, (error, result) => {
              if (error) {
                console.error('Error in readPersonalArticle(): ', error);
                reject(error);
              } else {
                resolve(result);
              }
              connection.release();
            });
          }
        });
      }
    });
  });
};

export default {
  createArticle,
  readArticles,
  readArticle,
  updateArticle,
  deleteArticle,
  hardDeleteArticle,
  readPersonalArticle
};
