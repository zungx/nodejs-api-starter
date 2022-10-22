const Error = module.exports;

Error.HttpError = require('./http.error');
Error.FieldError = require('./field.error');
Error.ValidationError = require('./validation.error');
Error.BadRequestError = require('./bad-request.error');
Error.NotFoundError = require('./not-found.error');
Error.TimeoutError = require('./timeout.error');
Error.ForbiddenError = require('./forbidden.error');
Error.InternalServiceError = require('./internal-service.error');
Error.UserUnauthorizedError = require('./user-unauthoried.error');
Error.UserTokenExpiredError = require('./user-token-expired.error');
