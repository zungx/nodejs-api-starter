const Constants = module.exports;

Constants.PAGINATION = Object.freeze({
  DEFAULT_LIMIT: 20,
  DEFAULT_OFFSET: 0
});

Constants.VALIDATE_ON = Object.freeze({
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params',
  HEADER: 'headers'
});
