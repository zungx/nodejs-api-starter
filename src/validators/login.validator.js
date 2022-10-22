const _ = require('lodash');
const Joi = require('@hapi/joi');
const { VALIDATE_ON } = require('../constant/index');

const LoginValidator = module.exports;

LoginValidator.validate = {
  [VALIDATE_ON.BODY]: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
};
