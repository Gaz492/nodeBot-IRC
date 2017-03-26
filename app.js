'use strict';

// Initialize Requirements
const irc = require('irc');
const nconf = require('nconf');
const util = require('util');
const walk = require('walk');

// Middleware

const commandManager = require('./middleware/commandManager')

// Get/Read Config
function getConfigFile() {
    const configOverride = './config/config.user.json',
        defaultConfig = './config/config.default.json';
    return require('fs').existsSync(configOverride) ? configOverride : defaultConfig;
}

nconf.file({ file: getConfigFile() });

// Custom Vars
const controlChar = nconf.get('bot').controlChar

// Initialize IRC Connection

const bot = new irc.Client(
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

bot.connect();
util.log('Connecting to %s ...', nconf.get('connection').host);