# Weather API service
This is a API service in NodeJS to demonstrate a simple proxy service to the open weather API with support for caching and ratelimiting. All the required values for ratelimiting and caching are configuration driven via `config` directory.
Caching is LRU but in a real deployment use distributed in-memory cachers like Redis.

The service can be easily extended to support any backend API service by writing a client that extends the api base client.

# Getting started
### Setup instructions & system requirements
Install Git and NodeJs v6 or above

Setup:
```
  git clone 'this repo'
  npm install
```
# Usage 
```
  > node app/server.js
```

### Unit tests
The tests are written using a BDD. NodeJS has an extensive library collection to support BDD. This repo uses mocha, assert, should and Sinon.
```
  > npm unit-test
```
### Coverage

```
  > ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha ./test/**/*.test.js -- -R spec
```
