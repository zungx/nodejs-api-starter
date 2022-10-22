const mysql = require('mysql');
const _ = require('lodash');
const dbConfig = require('../config/database.config');

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port
});

class MysqlDB {
  static get instance() {
    return connection;
  }

  static async init() {
    return new Promise((resolve, reject) => {
      connection.connect(error => {
        if (error) reject(error);
        console.log("Successfully connected to the database.");
        resolve();
      });
    });
  }

  static disconnect() {
    connection.end();
  }

  static async selectAll(rawQuery) {
    if (_.isNil(rawQuery)) {
      throw Error('error query');
    }
    return new Promise((resolve, reject) => {
      this.instance.query(rawQuery, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async selectRow(rawQuery) {
    if (_.isNil(rawQuery)) {
      throw Error('error query');
    }
    const query = `${rawQuery} LIMIT 1`;
    return new Promise((resolve, reject) => {
      this.instance.query(query, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.length ? res[0] : null);
      });
    });
  }

  static async insert(rawQuery, data) {
    return new Promise((resolve, reject) => {
      this.instance.query(rawQuery, data, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.insertId);
      });
    });
  }

  static async update(rawQuery, data) {
    return new Promise((resolve, reject) => {
      this.instance.query(rawQuery, data, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.affectedRows);
      });
    });
  }
}

module.exports = MysqlDB;
