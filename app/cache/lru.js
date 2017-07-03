'use-strict'

const cache = require('lru-cache');
const parseDuration = require('parse-duration');
const limits = require('../../config/servicelimits.json');

const options = {
    maxAge: parseDuration(limits.cachedResultsStayFor),
};

module.exports = new cache(options);