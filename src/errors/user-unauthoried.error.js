const HttpError = require('./http.error');

class UserUnauthorizedError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'US-0401', option);
  }
}

module.exports = UserUnauthorizedError;
