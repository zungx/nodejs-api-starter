const { parsed: config } = require('dotenv').config();

module.exports = {
  redisPort: config.REDIS_PORT || '6379',
  redisHost: config.REDIS_HOST || '127.0.0.1',
  authPrefix: config.REDIS_AUTH_PREFIX || 'auth_',
  bidLimitPrefix: config.REDIS_BID_LIMIT_PREFIX || 'bid_limit_',
  dbIndex: config.REDIS_DB_INDEX || 0
};
