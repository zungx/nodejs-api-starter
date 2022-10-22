const HttpError = require('./http.error');

class NotFoundError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'IS-0404', option);
  }
}

module.exports = NotFoundError;
