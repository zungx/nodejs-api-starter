const {
  HttpError,
  InternalServiceError,
  ValidationError
} = require('../errors');
const { error } = require('../helpers/response.helper');

module.exports = (e, req, res, next) => {
  if (e.name !== ValidationError.name) {
    console.log('Error: ', e);
  }

  if (!e.status || e.status === 500) {
    // capture to Sentry
  }

  if (e instanceof HttpError) {
    return error(req, res, e);
  }

  return error(req, res, new InternalServiceError(e.message));
};
