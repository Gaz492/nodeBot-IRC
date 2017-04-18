/**
 * @author Gareth
 * Created on 17/04/2017.
 */

'use strict';
const irc = require('irc-framework');
const colour = require('irc-colors');
const config = require('../configs/config');
const walk = require('walk');
const msgHandler = require('./messageHandler');
const minecraft = require('./module/minecraft');

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
const bot = new irc.Client();

// bot.addListener('debug', function(event){
//     console.log(event);
// });

bot.addListener('registered', function(event){
    console.log('Connection Successful');
    for(let i in config.channels){
        console.log(config.channels[i]);
        bot.join(config.channels[i]);
    }
    // ToDo Init command manager
});

bot.addListener('motd', function(event){
    console.log(event);
});

bot.addListener('topic', function(event){
    let channel = event.channel;
    let topic = event.topic;
    console.log(topic);
});

//The 'names' event is sent whenever a user connects, disconnects, or renames themselves
bot.addListener('userlist', function(event){
    //Object.keys because node-irc returns nicks as a large object with empty keys...
    // users = Object.keys(nicks);
    // console.log('userlist for', event.channel, event.users);
});

bot.addListener('join', function(event){
    let nick = event.nick;
    let channel = event.channel;
    console.log('User %s joined %s', nick, channel);
});

bot.addListener('message', function(event){
    let to = event.target;
    let from = event.nick;
    let message = event.message;
    console.log('%s | %s: %s', to, from, message);
    msgHandler.msgHandler(bot, from, to, message)
});


setInterval(function(){
    minecraft.autoStatus(function(data){
        bot.raw("PRIVMSG", "#gaz", data)
    })
}, 5000);

module.exports = bot;