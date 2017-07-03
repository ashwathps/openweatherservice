const co = require('co');
const request = require('co-request');
const createError = require('http-errors');


class ApiClientBase {
  sendApiRequest(options = { method: null, url: null, headers: null, body: null}) { // eslint-disable-line max-len
    const self = this;
    return co(function* doSend() {
      const {
        method,
        url,
        body,
        headers,
      } = options;

      if (body && ['put', 'post', 'patch'].indexOf(method) < 0) {
        throw new Error(`${method} does not support sending a payload in the request`);
      }

      const defaultHeaders = self.createRequestHeaders();

      const requestHeaders = Object.assign(defaultHeaders, headers);
      const httpRequest = {
        url,
        body,
        headers: requestHeaders,
        json: true,
      };

      if (!body) {
        delete httpRequest.body;
      }

      const httpPromise = request[method](httpRequest);
      return httpPromise.then((httpResponse) => {
        return httpResponse;
      }).catch((error) => {
        const promise = Promise.reject(error);
        return promise;
      });
    });
  }
  createRequestHeaders() { // eslint-disable-line class-methods-use-this
    const defaultHeaders = {};
    defaultHeaders['content_type'] = 'application/json; charset=utf-8';
    return defaultHeaders;
  }
}

module.exports = ApiClientBase;
