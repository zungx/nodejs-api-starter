const _ = require('lodash');

class FieldError extends Error {
  constructor(internalMessage, code, field, option = {}) {
    super(internalMessage);
    this.name = this.constructor.name;

    const message = _.get(option, 'message');

    this.output = {
      code,
      field,
      message
    };
  }
}

module.exports = FieldError;
