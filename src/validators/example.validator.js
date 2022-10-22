const _ = require('lodash');
const Joi = require('@hapi/joi');
const { VALIDATE_ON } = require('../constant/index');

const ExampleValidator = module.exports;

ExampleValidator.validate = {
  [VALIDATE_ON.QUERY]: Joi.object({
    id: Joi.string().required()
  })
};
