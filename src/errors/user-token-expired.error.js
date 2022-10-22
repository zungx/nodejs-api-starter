const HttpError = require('./http.error');

class UserTokenExpiredError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'US-0402', option);
  }
}

module.exports = UserTokenExpiredError;
