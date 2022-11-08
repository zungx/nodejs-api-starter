const _ = require('lodash');
const uuid = require('uuid');
const moment = require('moment');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { accessTokenTTL, refreshTokenTTL } = require('../config/app.config');
const { generateJWTToken } = require('../helpers/jwt.helper');
const UserModel = require('../models/user.model');
const redisClient = require('../database/redis');
const { authPrefix } = require('../config/redis.config');

const register = async (params) => {
  const user = await UserModel.findOne({
    where: {
      username: _.get(params, 'username')
    }
  });
  
  if (user) {
    return false;
  }

  const newUser = await UserModel.create({
    username: _.get(params, 'username'),
    password: hashSync(_.get(params, 'password'), genSaltSync(10)),
    created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  });

  return newUser.id;
};

const login = async (params) => {
  const username = _.get(params, 'username');
  const password = _.get(params, 'password');

  const user = await UserModel.findOne({
    where: {
      username
    }
  });

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


module.exports = {
  register,
  login
}