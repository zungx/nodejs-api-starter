const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const MasterDB = require('../database/db');

const basename = path.basename(__filename);
const db = {};

const loadModels = () => {
  fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      if (file === 'base-model.js') return;
      
      const model = require(path.join(__dirname, file));
  
      if (typeof model.init === 'function') db[model.name] = model.init(MasterDB.sequelize, DataTypes);
    });
  
  Object.values(db)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(db)); 
};

module.exports = {
  loadModels
};
