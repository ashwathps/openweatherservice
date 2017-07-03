'use strict';
const store = require('../store/lru');
const parseDuration = require('parse-duration');

function rateLimiter(config) {
  return function* middleware (next) {
    const isPresent = store.has(this.query.api_key);
    let value = {
      max: config.max - 1,
      at: Date.now()
    };
    if(!isPresent) {
      store.set(this.query.api_key, value)
    }else {
      let itemVal = store.peek(this.query.api_key);
      if(itemVal.max == 0) {
        this.throw(429, 'Slow down');
      }
      value.max = itemVal.max - 1;
      value.at = Date.now();

      const newMaxAge = parseDuration(config.duration) - (value.at - itemVal.at);
      store.set(this.query.api_key, value, newMaxAge);
    }
    yield next;
  }
}

module.exports = rateLimiter;