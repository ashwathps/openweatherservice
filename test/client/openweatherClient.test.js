require('co-mocha');
require('mocha');
const should = require('should');
const sinon = require('sinon');

const request = require('co-request');

const OpenWeatherClient = require('../../app/clients/openweatherClient');

describe('Open weather Client', () => {
  let sandbox;
  let requestMock;
  let client;
  const serviceHost = 'api.openweathermap.org/data/2.5/weather';
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    requestMock = sandbox.mock(request);
    client = new OpenWeatherClient();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('get weather with open weather', () => {
    function validArgs() {
      return {
        url: sinon.match.any,
        headers: sinon.match.any,
        json: sinon.match.any,
      };
    }

    it('should send a request to {GET} weather', function* test() {
      const expected = validArgs();
      expected.url = `http://${serviceHost}?q=melbourne,au&appid=081d22e5238cd7089c663e5383b2c4a5`;
      requestMock
        .expects('get')
        .once()
        .withArgs(expected)
        .returns(Promise.resolve({
          statusCode: 200,
        }));

      yield client.getWeather('au', 'melbourne', '081d22e5238cd7089c663e5383b2c4a5');
      requestMock.verify();
    });
  });
});