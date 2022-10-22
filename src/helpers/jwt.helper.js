const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/app.config');

const generateTokenId = () => crypto.randomBytes(32).toString('hex');

const verifyAccessToken = (token) => jwt.verify(token, jwtSecret);

const generateJWTToken = (payload, expiresIn) => jwt.sign(payload, jwtSecret, { expiresIn: expiresIn });

module.exports = {
  generateTokenId,
  verifyAccessToken,
  generateJWTToken
}
