'use-strict'

const store = require('lru-cache');
const parseDuration = require('parse-duration');
const limits = require('../../config/servicelimits.json');

const options = {
    maxAge: parseDuration(limits.ratelimit.duration),
};

module.exports = new store(options);