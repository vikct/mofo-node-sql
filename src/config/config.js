import Joi from 'joi';
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// setting up parameters for joi verification
const envVarSchema = Joi.object().keys({
  // Settting default environment as development, and providing 2 options for it.
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']),
  // Setting up default port
  PORT: Joi.number().default(3838),
  VERSION: Joi.string(),
  // NOTE: This is mysql port number
  MYSQL_PORT: Joi.number().default(3306),
  MYSQL_HOST: Joi.strict().default('127.0.0.1'),
  MYSQL_USER: Joi.string(),
  MYSQL_PASS: Joi.string(),
  MYSQL_NAME: Joi.string()
}).unknown().required();

const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysqlPort: envVars.MYSQL_PORT,
  mysqlHost: envVars.MYSQL_HOST,
  mysqlUser: envVars.MYSQL_USER,
  mysqlPassword: envVars.MYSQL_PASS,
  mysqlDatabase: envVars.MYSQL_DATABASE
};

// const connectionPool = mysql.createPool({
//   connectionLimit: 10,
//   host: config.mysqlHost,
//   user: config.mysqlUser,
//   password: config.mysqlPassword,
//   database: config.mysqlDatabase
// });

export default config;
