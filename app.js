/**
 * @author Gareth
 * Created on 17/04/2017.
 */

const client = require('./bot/core');
const config = require('./configs/config');

client.connect();
console.log("Connecting to %s ...", config.server.host);