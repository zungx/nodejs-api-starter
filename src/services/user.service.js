const _ = require('lodash');
const uuid = require('uuid');
const moment = require('moment');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { accessTokenTTL, refreshTokenTTL } = require('../config/app.config');
const { generateJWTToken } = require('../helpers/jwt.helper');
const User = require('../models/user.model');
const redisClient = require('../database/redis');
const { authPrefix } = require('../config/redis.config');
const db = require('../database/db');

const register = async (params) => {
  const user = await User.findOne(_.get(params, 'username'));
  if (user) {
    return false;
  }

  const userId = await User.create({
    username: _.get(params, 'username'),
    password: hashSync(_.get(params, 'password'), genSaltSync(10)),
    balance: 0,
    created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  });

  return userId;
};

const login = async (params) => {
  const username = _.get(params, 'username');
  const password = _.get(params, 'password');

  const user = await User.findOne(username);
  if (!user) {
    return false;
  }

  const match = compareSync(password, user.password);
  if (!match) {
    return false;
  }

  const accessTokenId = uuid.v4();
  const refreshTokenId = uuid.v4();
  const accessToken = generateJWTToken({
    token_id: accessTokenId,
    user_id: user.id
  }, accessTokenTTL);
  const refreshToken = generateJWTToken({
    token_id: refreshTokenId,
    access_token_id: accessTokenId,
    user_id: user.id,
  }, refreshTokenTTL);


  await redisClient.setEx(`${authPrefix}${accessTokenId}`, accessTokenTTL, `${user.id}`);
  await redisClient.setEx(`${authPrefix}${refreshTokenId}`, refreshTokenTTL, `${user.id}`);

  return {
    access_token: accessToken,
    refresh_token: refreshToken
  };
};

const deposit = async (userId, amount) => {
  const res = await db.update('UPDATE users SET balance = (balance + ?) WHERE id = ?', [amount, userId]);
  return res;
};

module.exports = {
  register,
  login,
  deposit
}