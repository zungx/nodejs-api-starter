const _ = require('lodash');
const { FieldError, ValidationError } = require('../errors');

function convertToFieldError(error, req) {
  return _.map(error.details, (detail) => {
    const {
      type, message, path, context
    } = detail;
    const field = _.join(path, '.');
    let errors = [];

    switch (type) {
      case 'object.missing':
        errors.push(new FieldError(message, 'FO-0001', _.head(_.get(context, 'peersWithLabels')), {
          message: req.t('any.required')
        }));
        break;

      case 'object.and':
        errors = _.map(_.get(context, 'missingWithLabels'), (key) => new FieldError(message, 'FO-0001', key, {
          message: req.t('any.required')
        }));
        break;

      case 'any.required':
        errors.push(new FieldError(message, 'FO-0001', field, { message }));
        break;

      case 'string.empty':
        errors.push(new FieldError(message, 'FO-0002', field, { message }));
        break;

      case 'string.max':
        errors.push(new FieldError(message, 'FO-0004', field, { message }));
        break;

      case 'any.only':
        errors.push(new FieldError(message, 'FO-0005', field, { message }));
        break;

      case 'string.email':
        errors.push(new FieldError(message, 'FO-0006', field, { message }));
        break;

      case 'array.base':
      case 'binary.base':
      case 'boolean.base':
      case 'date.base':
      case 'object.base':
      case 'number.base':
      case 'string.base':
      case 'string.pattern.base':
      case 'string.pattern.invert.base':
      default:
        errors.push(new FieldError(message, 'FO-0003', field, { message }));
        break;
    }

    return errors;
  });
}

module.exports = (...schemas) => async (req, res, next) => {
  try {
    const errors = _.flatten(_.flatten(await Promise.all(
      _.map(schemas, (schema) => _.flatten(_.map(schema, (validation, validateOn) => {
        const data = _.get(req, validateOn);

        const { error } = validation
          .options({ messages: req.getCatalog() })
          .validate(data, { abortEarly: false, allowUnknown: true });

        return error ? convertToFieldError(error, req) : [];
      })))
    )));

    return errors.length > 0 ? next(new ValidationError('Validation error', { errors })) : next();
  } catch (err) {
    return next(err);
  }
};
