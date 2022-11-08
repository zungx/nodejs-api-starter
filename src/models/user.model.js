const BaseModel = require('./base-model');

class UserModel extends BaseModel {
  static init(sequelize, DataTypes) {
    console.log('initititiit');
    return super.init({
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
      tableName: 'users',
      paranoid: true,
      timestamps: false,
      underscored: true,
      sequelize
    });
  }

  static associate(models) {
  }
}

module.exports = UserModel;