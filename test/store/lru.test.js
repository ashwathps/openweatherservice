require('co-mocha');
require('mocha');
const parseDuration = require('parse-duration');
const should = require('should');
const sinon = require('sinon');

const JBStore = require('../../app/store/lru');
const serviceLimits = require('../../config/servicelimits.json')

describe('JBStore', () => {
  let sandbox;
  let sinonClock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sinonClock = sinon.useFakeTimers(Date.now());
  });

  afterEach(() => {
    sandbox.restore();
    sinonClock.restore();
  });

  describe('get and set keys', () => {

    it('should store the value and flush correctly', function* test() {
      JBStore.set('key1', 'value1');
      
      sinonClock.tick(parseDuration(serviceLimits.cachedResultsStayFor) + 100000);

      should(JBStore.get('key1')).be.undefined();

    });

    it('should store the value correctly', function* test() {
      JBStore.set('key1', 'value1');
      
      sinonClock.tick(parseDuration(serviceLimits.cachedResultsStayFor) - 100);

      should(JBStore.get('key1')).be.equal('value1');

    });
  });
});