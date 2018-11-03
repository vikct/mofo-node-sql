/* express.js */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import expressValidation from 'express-validation';
import httpStatus from 'http-status';

import config from './config';
import index from '../server/routes/index.route';
import AppError from '../server/helpers/error';

const app = express();

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS = Cross Origin Resource Sharing
app.use(cors());

// HTTP request logger middleware for node.js
app.use(morgan('dev'));

/* GET home page. */
app.get('/', (req, res) => {
  res.send(`server started on port ${config.port} (${config.env})`);
});

app.use('/api', index);

// If error is not an instance of APIError, convert it
app.use((err, req, res, next) => {
  let errorMessage;
  let errorCode;
  let errorStatus;

  if (err instanceof expressValidation.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = httpStatus.BAD_REQUEST;
    }
    const error = AppError.APIError(errorMessage, errorStatus, true, errorCode);
    return next(error);
  }
  return next(err);
});

// Error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    code: err.coe ? err.code : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  });
  next();
});

export default app;
