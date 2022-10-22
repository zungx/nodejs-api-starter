const express = require('express');
const { userAuth, apiValidator } = require('./middleware/index');
const loginSchema = require('./validators/login.validator');
const exampleSchema = require('./validators/example.validator');

const authController = require('./controllers/auth.controller');
const exampleController = require('./controllers/example.controller');

const apiRouter = express.Router();

// Auth
apiRouter.post('/auth/register',apiValidator(loginSchema.validate), authController.register);
apiRouter.post('/auth/login', apiValidator(loginSchema.validate), authController.login);

apiRouter.get('/example', apiValidator(exampleSchema.validate), exampleController.example);
apiRouter.get('/protected', userAuth(), apiValidator(exampleSchema.validate), exampleController.example);

module.exports = apiRouter;
