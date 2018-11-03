import config from './config/config';
import app from './config/express';

if (!module.parent) {
  // listening on port number which retrieved from config.port
  app.listen(config.port, () => {
    console.log(`server started on port ${config.port} (${config.env})`);
  });
}

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!');
// });

// server.listen('3838', () => {
//   console.log('server start on 3838 port');
// });
