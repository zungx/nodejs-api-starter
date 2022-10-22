const i18n = require('i18n');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'ja'],

  // where to store json files - defaults to './locales' relative to modules directory
  directory: `${__dirname}`,

  // whether to write new locale information to disk - defaults to true
  updateFiles: false,

  // sync locale information across all files - defaults to false
  syncFiles: false,

  objectNotation: true,

  // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
  queryParameter: 'lang',
  // sets a custom header name to read the language preference from
  // - accept-language header by default
  header: 'accept-language',

  defaultLocale: 'en',

  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  //   cookie: 'lang',

  /**
   * hash to specify different aliases for i18n's internal methods
   * to apply on the request/response objects (method -> alias).
   * note that this will *not* overwrite existing properties with the same name
   */
  api: {
    __: 't', // now req.__ becomes req.t
    __n: 'tn' // and req.__n can be called as req.tn
  },
  mustacheConfig: {
    tags: ['{{#', '}}'],
    disable: false
  }
});

module.exports = i18n;
