'use strict';

const Router = require('koa-router');
const openweatherConfig = require('../config/openweather.json');
const servicelimits = require('../config/servicelimits.json');
const apiKeyisValid = require('./middleware/apiKeyisValid');
const apiKeyExists = require('./middleware/apiKeyExists');
const ratelimiter = require('./middleware/ratelimiter');
const WeatherController = require('./controller/weatherController');

const router = new Router();

router.use(function* attachToRequest(next) {
  this.router = router;
  yield next;
});
router.use(apiKeyExists);
router.use(apiKeyisValid(openweatherConfig.account.default));

router.get('/liveness', function(){
  this.status = 200;
});

router.get('/weather/country/:country/city/:city', ratelimiter(servicelimits.ratelimit), function* get() {
  return yield new WeatherController(this).getWeather();
});

module.exports = router.routes();