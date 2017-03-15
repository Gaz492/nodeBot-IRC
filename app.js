'use strict';

// Initialize Requirements
var irc = require('irc');
var nconf = require('nconf');
var util = require('util');
var walk = require('walk');
var bot;

var commands = ['mcstatus', 'faq'];

// Get/Read Config
function getConfigFile() {
    var configOverride = './config/config.user.json',
        defaultConfig = './config/config.default.json';
    return require('fs').existsSync(configOverride) ? configOverride : defaultConfig;
}

nconf.file({ file: getConfigFile() });

var cmdList = "";

// Initialize IRC Connection

bot = new irc.Client(
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

// 
var controlChar = nconf.get('bot').controlChar;

// Handelers
bot.on('error', function (message) {
    util.log('[ERROR]: ', message);
});

bot.on('registered', function (message) {
    util.log('Connection Successfull');
});

bot.on('motd', function (message) {
    util.log(message);
});

bot.on('topic', function (message) {
    util.log(message);
});

bot.on('message', function (from, to, message) {
    util.log(to + ' | ' + from + ': ' + message);
    if (message.startsWith(controlChar)) {
        var msg = message.replace(controlChar, "").split(" ");
        var command = msg[0];
        var args = msg.slice(2);
        if (command == "help") {
            bot.notice(from, "Usage: .help <command>");
            bot.notice(from, "Available Commands: help, " + cmdList);
        }
        else {
            bot.say(to, "Command not found");
        }
    };
})

bot.connect();
util.log('Connecting to %s ...', nconf.get('connection').host);