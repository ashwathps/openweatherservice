'use strict';

function* apiKeyExists(next) {
  if(!this.query.api_key) {
    this.throw(400, 'Missing api_key in the request url');
    return;
  }
  yield next;
}

module.exports = apiKeyExists;