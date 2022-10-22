const HttpError = require('./http.error');

class InternalServiceError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'IS-0500', option);
  }
}

module.exports = InternalServiceError;
