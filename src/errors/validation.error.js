const HttpError = require('./http.error');

class ValidationError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'IS-0422', option);
  }
}

module.exports = ValidationError;
