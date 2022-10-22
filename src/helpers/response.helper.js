const _ = require('lodash');
const { FieldError } = require('../errors');

const successResponse = (req, res, data, code) => res.status(code).send(data);
const errorResponse = (req, res, error, code) => {
  res.status(code);
  res.json({ error });
};

const ResponseHelper = module.exports;

ResponseHelper.ok = (req, res, data) => successResponse(req, res, { data }, 200);
ResponseHelper.error = (req, res, error) => errorResponse(req, res, this.parseError(req, error), _.get(error, 'status', 500));

ResponseHelper.parseError = (req, e) => (e instanceof FieldError ? {
    code: e.output.code,
    field: e.output.field,
    message: e.output.message || req.t(`${e.output.defaultCode}.title`)
  } : {
    code: e.output.code,
    title: e.output.title || req.t(`${e.output.defaultCode}.title`),
    message: e.output.message || req.t(`${e.output.defaultCode}.message`),
    errors: _.map(_.get(e, 'output.errors', []), (childError) => ResponseHelper.parseError(req, childError))
});
