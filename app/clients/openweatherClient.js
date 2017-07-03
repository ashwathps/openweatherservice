const co = require('co');
const ApiClientBase = require('./apiClientBase');
const openweatherConfig = require('../../config/openweather.json');

class OpenWeatherClient extends ApiClientBase {
  constructor() {
    super();
  }

  buildUrl(query) {
    return `http://${openweatherConfig.apiUrl}?${query}`;
  }

  // Would never need this as long as the middleware exists
  getApiKey(){
    const arr = openweatherConfig.account.default.keys;
    const key = arr[Math.floor(arr.length * Math.random())];
    return key;
  }

  getWeather(country, city, key) {
    const self = this;
    return co(function* doGet() {
      const url = self.buildUrl(`q=${city},${country}&appid=${key||self.getApiKey()}`);
      const response = yield self.sendApiRequest({ method: 'get', url });
      return response.body;
    });
  }
}

module.exports = OpenWeatherClient;