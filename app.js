'use strict';

// Initialize Requirements
var irc = require('irc');
var nconf = require('./modules/configReader');
var util = require('util');
var walk = require('walk');

// Middleware

var commandManager = require('./modules/commandManager')

// Custom Vars
var controlChar = nconf.get('bot').controlChar

// Initialize IRC Connection

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

// Handelers
client.on('error', function (message) {
    util.log('[ERROR]: ', message);
});

client.on('registered', function (message) {
    util.log('Connection Successfull');
});

client.on('motd', function (message) {
    util.log(message);
});

client.on('topic', function (message) {
    util.log(message);
});

client.on('message', function (from, to, message) {
    util.log(to + ' | ' + from + ': ' + message)
    if (message.startsWith(controlChar)) {
        var msg = message.replace(controlChar, "").split(" ");
        var command = msg[0];
        var args = msg.slice(2);
        commandManager.commandManager(command, from, to, args)
    };
});

// plugins
// todo

client.connect();
util.log('Connecting to %s ...', nconf.get('connection').host);

// Things

module.exports = {
    sendMessage: function(to, message){
        client.say(to, message);
    },
    sendNotice: function(to, message){
        client.notice(to, message)
    }
}