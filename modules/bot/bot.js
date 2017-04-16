var irc = require('irc');
var util = require('util');
var walk = require('walk');

// Custom Modules
var nconf = require('../configReader');
var cmdManager = require('./commandManager');

var controlChar = nconf.get('bot').controlChar;

// Init
var client = new irc.Client(
    nconf.get('connection').host,
    nconf.get('bot').nick,
    {
        channels: nconf.get('channels'),
        userName: nconf.get('bot').userName,
        realName: nconf.get('bot').realName,
        autoRejoin: nconf.get('bot').autoRejoin,
        autoConnect: nconf.get('bot').autoConnect,
        secure: nconf.get('bot').secure,
        floodProtection: nconf.get('bot').floodProtection,
        floodProtectionDelay: nconf.get('bot').floodProtectionDelay,
        sasl: nconf.get('bot').sasl,
        retryCount: nconf.get('bot').retryCount,
        retryDelay: nconf.get('bot').retryDelay,
        showErrors: nconf.get('bot').showErrors,
        debug: nconf.get('bot').debug
    }
);

// Listeners
client.on('error', function (message) {
    console.error('[ERROR]: ', message);
});

client.on('registered', function (message) {
    console.log('Connection Successfull');
});

client.on('join', function(channel, nick, message){
   console.log("User " + nick + " joined " + channel);
});

client.on('motd', function (message) {
    console.log(message);
});

client.on('topic', function (message) {
    console.log(message);
});

client.on('names', function(channel, nicks){
    console.log(channel + ": " + util.inspect(nicks, false, null))
});

client.on('message', function (from, to, message) {
    console.log(to + ' | ' + from + ': ' + message)
    if (message.startsWith(controlChar)) {
        var msg = message.replace(controlChar, "").split(" ");
        var command = msg[0];
        var args = msg.slice(1);
        cmdManager.onCommand(client, command, to, from, args)
    }
});

/*
*
* Core Functions
*
*/

function isOp(channel, user){

}

module.exports = client;