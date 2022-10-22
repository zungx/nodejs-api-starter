const redis = require('redis');
const _ = require('lodash');
const dbConfig = require('../config/redis.config');

const redisClient = redis.createClient({
  host: dbConfig.redisHost,
  port: dbConfig.redisPort,
  database: dbConfig.dbIndex
});

module.exports = redisClient;
