const _ = require('lodash');
const { UserUnauthorizedError } = require('../errors/index');
const redisClient = require('../database/redis');
const { authPrefix } = require('../config/redis.config');
const { verifyAccessToken } = require('../helpers/jwt.helper');

module.exports = () => async (req, res, next) => {
  if (!req.headers.authorization) return next(new UserUnauthorizedError(req.t('unauthorized')));

  const regex = /^Bearer (.+)$/;
  const found = req.headers.authorization.match(regex);

  if (!found || found.length !== 2) return next(new UserUnauthorizedError(req.t('unauthorized')));

  const jwtToken = found[1];

  try {
    const { token_id: tokenId, user_id: userId } = verifyAccessToken(jwtToken);
    const exist = await redisClient.exists(`${authPrefix}${tokenId}`);
    if (!exist) {
      throw new UserUnauthorizedError();
    }
    const uId = await redisClient.get(`${authPrefix}${tokenId}`);
    req.userId = uId;

    return next();
  } catch (e) {
    return next(new UserUnauthorizedError(req.t('unauthorized')));
  }
};
