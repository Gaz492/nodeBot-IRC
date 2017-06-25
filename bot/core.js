/**
 * @author Gareth
 * Created on 17/04/2017.
 */

'use strict';
import irc from 'irc-framework';
import colour from 'irc-colors';
import walk from 'walk';

// Modules
import msgHandler from './messageHandler';
import minecraft from './module/minecraft';

// Configs
import config from '../configs/config';

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


bot.addListener('registered', function(event){
    console.log('Connection Successful');
    bot.say('nickserv', 'identify ' + config.bot.userName + ' ' + config.bot.nickServPass);
    for(let i in config.channels){
        console.log(config.channels[i]);
        bot.join(config.channels[i]);
    }
    if(config.minecraft.enabled){
        let poll_interval = config.minecraft.poll_interval * 1000;
        minecraft.autoStatus(function(callback){
            bot.raw("PRIVMSG", config.minecraft.send_channel, callback)
        });
        setInterval(function () {
            minecraft.autoStatus(function(callback){
                bot.raw("PRIVMSG", config.minecraft.send_channel, callback)
            })
        }, poll_interval);
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

bot.addListener("invited", function(nick, channel){
    bot.join(channel);
});


// setInterval(function(){
//     minecraft.autoStatus(function(data){
//         bot.raw("PRIVMSG", "#gaz", data)
//     })
// }, 5000);

module.exports = bot;