const _ = require('lodash');
const { ok } = require('../helpers/response.helper');

const Controller = module.exports;

Controller.example = async(req, res, next) => {
  try {
   
    return ok(req, res, {});
  } catch (e) {
    next(e);
  }
};
