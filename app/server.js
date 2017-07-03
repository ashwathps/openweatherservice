const openweatherConfig = require('../config/openweather.json');
const servicelimitConfig  =  require('../config/servicelimits.json');
const http = require('http');
const Koa = require('koa');
const router = require('./router');

class JBweatherService {
  constructor() {
  }

  bootStrapConfig() {
    if(servicelimitConfig.ratelimit.max > openweatherConfig.account.default.max) {
      throw('Invalid configuration, JB limits cannot exceed openweather limits');
    }
  }

  start() {
    try{
      this.bootStrapConfig();
      
    } catch(ex) {
      throw(ex);
    }
  }
}

// const server = new JBweatherService();
// server.start();

const app = new Koa();
app.use(router);
http
  .createServer(app.callback())
  .listen(8009);
console.log("Weather service listening on 8099"); 