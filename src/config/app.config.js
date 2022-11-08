const { parsed: config } = require('dotenv').config();

module.exports = {
  appName: config.APP_NAME || 'app',
  environment: config.APP_ENV || 'dev',
  port: config.APP_PORT || 3000,
  host: config.APP_HOST || 'localhost',
  jwtSecret: config.JWT_SECRET || '',
  accessTokenTTL: 365 * 24 * 60 * 60, // in second
  refreshTokenTTL: 365 * 24 * 60 * 60, // in second
  logLevel: config.LOG_LEVEL || 'debug',
  logFolder: config.LOG_FOLDER || 'logs',
};
