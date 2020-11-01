const string = require('./lib/string');
const utils = require('./lib/utils');
const when = require('./lib/when');

module.exports = {
  ...string,
  ...utils,
  when
};
