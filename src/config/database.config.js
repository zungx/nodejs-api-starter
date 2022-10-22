const { parsed: config } = require('dotenv').config();

module.exports = {
  username: config.DB_USER || 'root',
  password: config.DB_PASS || '',
  database: config.DB_NAME || '',
  host: config.DB_HOST || '127.0.0.1',
  port: config.DB_PORT || '3306'
};
