const Sequelize = require('sequelize');
const dbConfig = require('../config/database.config');
const appConfig = require('../config/app.config');

const client = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    },
    logging: appConfig.logLevel === 'debug'
  }
);

class MasterDB {
  static get sequelize() {
    return client;
  }

  static async init() {
    return new Promise((resolve, reject) => {
      client
        .authenticate()
        .then(() => {
          // TODO: Logger
          console.log('Connection to MasterDB has been established successfully.')
          resolve()
        })
        .catch((err) => {
          console.log('Unable to connect to MasterDB:', err);
          reject(err);
        });
    });
  }

  static disconnect() {
    client.close();
  }
}

module.exports = MasterDB;
