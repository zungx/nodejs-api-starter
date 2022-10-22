const _ = require('lodash');
const { ok } = require('../helpers/response.helper');
const { UserUnauthorizedError, BadRequestError } = require('../errors/index');
const { register, login } = require('../services/user.service');

const Controller = module.exports;

Controller.login = async (req, res, next) => {
  try {
    const result = await login(_.get(req, 'body'));

    if (!result) {
      throw new UserUnauthorizedError();
    }

    return ok(req, res, result);
  } catch (e) {
    next(e);
  }
};

Controller.register = async (req, res, next) => {
  try {
    const userId = await register(_.get(req, 'body'));
    
    if (!userId) {
      throw new BadRequestError();
    }

    return ok(req, res, {
      'user_id': userId
    });
  } catch (e) {
    next(e);
  }
};
