/**
 * @author Gareth
 * Created on 17/04/2017.
 */

'use strict';
const irc = require('irc');
const colour = require('irc-colors');
const config = require('../configs/config');
const walk = require('walk');
const msgHandler = require('./messageHandler');

// Set Vars
const commandPrefix = config.bot.commandPrefix;
let users;

//For logging, not really currently useful.
const logActions = {
    JOIN: "[JOIN]",
    PART: "[PART]",
    MSG: "[MSG]",
    ERROR: "[ERROR]",
    INFO: "[INFO]"
};

/*
*
* Init
* See config for more details
*
*/
const bot = new irc.Client(
    config.server.host,
    config.bot.nick,
    {
        channels: config.channels,
        userName: config.bot.userName,
        realName: config.bot.realName,
        port: config.server.port,
        autoRejoin: config.misc.autoRejoin,
        autoConnect: config.misc.autoConnect,
        secure: config.misc.secure,
        floodProtection: config.misc.floodProtection,
        floodProtectionDelay: config.misc.floodProtectionDelay,
        sasl: config.misc.sasl,
        retryCount: config.misc.retryCount,
        retryDelay: config.misc.retryDelay,
        showErrors: config.misc.showErrors,
        debug: config.misc.debug
    }
);

bot.addListener('error', function(message){
    console.error('%s: %s', logActions.ERROR, message);
});

bot.addListener('registered', function(message){
    console.log('Connection Successful');
    // ToDo Init command manager
});

bot.addListener('motd', function(message){
    console.log(message);
});

bot.addListener('topic', function(message){
    console.log(message);
});

//The 'names' event is sent whenever a user connects, disconnects, or renames themselves
bot.addListener('names', function(channel, nicks){
    //Object.keys because node-irc returns nicks as a large object with empty keys...
    users = Object.keys(nicks);
});

bot.addListener('join', function(channel, nick, message){
    console.log('User %s joined %s', nick, channel);
});

bot.addListener('message', function(from, to, message){
    console.log('%s | %s: %s', to, from, message);
    msgHandler.msgHandler(bot, from, to, message)
});

module.exports = bot;