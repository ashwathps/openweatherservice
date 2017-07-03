'use-strict'

const openWeatherClient = require('../clients/openweatherClient');
const weatherCache = require('../cache/lru');

class WeatherController {
  constructor(koaCtx) {
    this.params = koaCtx.params;
    this.request = koaCtx.request;
    this.response = koaCtx.response;
    this.query = koaCtx.query;
  }

  fetchCachedResponses(key) {
    if(weatherCache.has(key)) {
      const response = weatherCache.get(key).body;
      return { cached: true, result: response };
    }
  }

  modifyResponse(response) {
    if(response.weather) {
      return response.weather[0].description || 'No data';
    }
    return '';
  }

  * getWeather() {
    const cached = this.fetchCachedResponses(this.request.originalUrl)
    if(!cached) {
      const client = new openWeatherClient();
      const response = yield client.getWeather(this.params.country, this.params.city, this.query.api_key);
      weatherCache.set(this.request.originalUrl, {body: response, code: 200});
      this.response.body = { cached: false, result: this.modifyResponse(response) };
    }else {
      this.response.body = { cached: true, result: this.modifyResponse(cached.result) };
    }
    this.response.status = 200;
  }
}
module.exports = WeatherController;