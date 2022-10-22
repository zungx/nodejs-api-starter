const express = require('express')
const bodyParser = require('body-parser');
const config = require('./src/config/app.config');
const apiRouter = require('./src/api.route');
const i18n = require('./src/i18n');
const { errorHandler } = require('./src/middleware');
const { NotFoundError } = require('./src/errors');
const { error } = require('./src/helpers/response.helper');
const mysqlDB = require('./src/database/db');
const redisClient = require('./src/database/redis');


const app = express();

(async () => {
  
  await mysqlDB.init()
  await redisClient.connect();

  app.use(i18n.init);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/', apiRouter);
  
  app.use(errorHandler);
  app.use((req, res) => error(req, res, new NotFoundError()));

  app.listen(config.port, config.host, () => {
    console.log(`Server listening on http://${config.host}:${config.port}`)
  });
})()

