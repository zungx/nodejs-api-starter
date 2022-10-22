const Middleware = module.exports;

Middleware.apiValidator = require('./api-validator');
Middleware.userAuth = require('./user-auth');
Middleware.errorHandler = require('./error-handler');