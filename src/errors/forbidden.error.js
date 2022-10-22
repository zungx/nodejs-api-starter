const HttpError = require('./http.error');

class ForbiddenError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'US-0403', option);
  }
}

module.exports = ForbiddenError;
