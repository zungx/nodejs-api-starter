const moment = require('moment');

const nowDB = () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  nowDB
}
