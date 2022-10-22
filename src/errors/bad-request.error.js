const _ = require('lodash');
const HttpError = require('./http.error');

class BadRequestError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, _.get(option, 'error_id', 'IS-0400'), option);
  }
}

module.exports = BadRequestError;
