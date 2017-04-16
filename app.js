'use strict';

// Initialize Requirements

const nconf = require('./modules/configReader');
const client = require('./modules/bot/bot');

// Initialize IRC Connection

client.connect();
console.log('Connecting to %s ...', nconf.get('connection').host);