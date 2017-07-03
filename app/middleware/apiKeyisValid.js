'use strict';
const ld = require('lodash');

function apiKeyisValid(config) {
  return function* middleware (next) {
    if(!ld.includes(config.keys, this.query.api_key)) {
      this.throw(400, 'Invalid api_key in the request url');
      return;
    }
    yield next;
  }
}

module.exports = apiKeyisValid;