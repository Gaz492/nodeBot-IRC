'use strict';

// Initialize Requirements

var nconf = require('./modules/configReader');
var client = require('./modules/bot/bot');

// Initialize IRC Connection

client.connect();
console.log('Connecting to %s ...', nconf.get('connection').host);