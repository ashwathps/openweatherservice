'use strict';

require('mocha');
require('should');
const sinon = require('sinon');
const restBuilder = require('../.stubs/restBuilder');
const weatherService = require('../../app/clients/openweatherClient');
const weatherController = require('../../app/controller/weatherController');
const ld = require('lodash');

describe('Weather Controller', () => {
  let sandbox;
  let testClient;
  let target;

  function stubClassMethod(Class, funcSelector) {
    const obj = new Class({});
    return sandbox.stub(Class.prototype, funcSelector(obj).name);
  }

  function buildGetWeatherApp(fn, mw) {
    const builder = new restBuilder();
    /* eslint-disable func-names */
    builder.router
      .get('/weather/country/:country/city/:city',
      mw || function* validate(n) {
        yield n;
      }, function* () {
        target = new weatherController(this);
        yield target.getWeather();
      });
    /* eslint-enable func-names */
    return builder.build();
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Get Weather for a city and country", () => {

    it('should return correct response with cache set', (done) => {
      const getCache = stubClassMethod(weatherController, um => um.fetchCachedResponses);
      getCache
        .returns({cached: true, result: {}});
      testClient = buildGetWeatherApp();
      testClient.get('/weather/country/au/city/adelaide')
        .expect({cached: true, result: {}})
        .expect(200, done);
    });

    it('should return correct response without cache set', (done) => {
      const getCache = stubClassMethod(weatherController, um => um.fetchCachedResponses);
      getCache
        .returns(null);
      testClient = buildGetWeatherApp();
      const result = testClient.get('/weather/country/au/city/melbourne')
        .expect(function(res) {
          delete res.body.result;
        })
        .expect(200, {cached: false}, done);
    });

    it('should return correct response with cache set', (done) => {
      testClient = buildGetWeatherApp();
      const result = testClient.get('/weather/country/au/city/melbourne')
        .expect(function(res) {
          delete res.body.result;
        })
        .expect(200, {cached: true}, done);
    });
  });
});