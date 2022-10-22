const HttpError = require('./http.error');

class TimeoutError extends HttpError {
  constructor(internalMessage, option = {}) {
    super(internalMessage, 'IS-0504', option);
  }
}

module.exports = TimeoutError;
