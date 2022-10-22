const _ = require('lodash');

const DEFAULT_ERROR_CODE = 'IS-0500';

function generateHttpStatusCode(code) {
  switch (code) {
    case 'IS-0001':
    case 'IS-0002':
    case 'IS-0400':
      return 400;
    case 'US-0401':
    case 'US-0402':
    case 'IS-0401':
    case 'IS-0402':
      return 401;
    case 'US-0403':
      return 403;
    case 'IS-0404':
      return 404;
    case 'IS-0415':
      return 415;
    case 'IS-0422':
      return 422;
    case 'IS-0503':
      return 503;
    case 'IS-0504':
      return 504;
    case 'IS-0500':
    default:
      return 500;
  }
}

class HttpError extends Error {
  constructor(internalMessage, defaultCode = DEFAULT_ERROR_CODE, option = {}) {
    super(internalMessage);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(internalMessage)).stack;
    }

    const code = _.get(option, 'code', defaultCode);
    const status = _.get(option, 'status', generateHttpStatusCode(defaultCode));
    const title = _.get(option, 'title', '');
    const message = _.get(option, 'message', '');
    const errors = _.get(option, 'errors', []);

    this.status = status;
    this.output = {
      status,
      code,
      title,
      message,
      defaultCode,
      errors
    };
  }
}

module.exports = HttpError;
