import mysql from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config/config';
import AppError from '../helpers/error';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlDatabase
});

// [C]reate, [R]ead, [U]pdate, [D]elete, geddit?

// CREATE
const createUser = (obj) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'INSERT INTO user SET ?';
        connection.query(query, obj, (error, result) => {
          if (error) {
            console.error('Error in createUser(): ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`Added 1 record of id: ${result.insertId} to user`);
          }
          connection.release();
        });
      }
    });
  });
};

// READ ALL
const readUsers = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'SELECT * FROM user WHERE is_active=1';
        connection.query(query, (error, result) => {
          if (error) {
            console.error('Error in readUsers(): ', error);
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
const readUser = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'SELECT * FROM user WHERE id=? AND is_active=1';
        connection.query(query, id, (error, result) => {
          if (error) {
            console.error('Error in readUser(): ', error);
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
const updateUser = (obj, id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'UPDATE user SET ? WHERE id=? AND is_active=1';
        connection.query(query, [obj, id], (error, result) => {
          if (error) {
            console.error('Error in updateUser(): ', error);
          } else if (result.affectedRows === 0) {
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
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'UPDATE user SET is_active=0 WHERE id=?';
        connection.query(query, id, (error, result) => {
          if (error) {
            console.error('Error in deleteUser(): ', error);
          } else if (result.affectedRows === 0) {
            resolve('No such record exist');
          } else if (result.message.match('Changed: 1')) {
            resolve('User removed successfully');
          } else {
            resolve('User already being removed');
          }
          connection.release();
        });
      }
    });
  });
};

// DELETE (HARD)
const hardDeleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'DELETE FROM user WHERE id=?';
        connection.query(query, id, (error, result) => {
          if (error) {
            console.error('Error in hardDeleteUser(): ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('User removed successfully');
          } else {
            resolve('Failed to remove user');
          }
          connection.release();
        });
      }
    });
  });
};

// Authenticate
const authenticate = (obj) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        const query = 'SELECT * FROM user WHERE username=?';
        connection.query(query, obj.username, (error, result) => {
          if (error) {
            console.error('Error in authenticate(): ', error);
            reject(error);
          } else if (Object.keys(result).length === 0) {
            // resolve('User account is not registered');
            reject(new AppError.NotRegisteredError());
          } else {
            const dbHashPassword = result[0].password;
            const userPassword = obj.password;
            bcrypt.compare(userPassword, dbHashPassword)
              .then((res) => {
                if (res) {
                  // resolve('Login successfully');
                  const payload = {
                    id: result[0].id,
                    username: result[0].username,
                    firstName: result[0].first_name,
                    lastName: result[0].last_name,
                    email: result[0].email
                    // password: result[0].password
                  };
                  const token = jwt.sign({
                    payload,
                    exp: Math.floor(Date.now() / 1000) + (60 * 15)
                  }, 'secret_key');
                  resolve(
                    Object.assign(
                      {
                        code: 200,
                        message: 'Login successfully',
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        token
                      }
                    )
                  );
                } else {
                  // resolve('Username and password mismatch');
                  reject(new AppError.WrongPasswordError());
                }
              });
          }
          connection.release();
        });
      }
    });
  });
};

export default {
  createUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
  hardDeleteUser,
  authenticate
};
