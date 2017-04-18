/**
 * @author Gareth
 * Created on 17/04/2017.
 */
'use strict';
const config = require('../configs/config');
const irc = require('irc');

const client = irc.Client();

function messageHandler(bot, from, to , message){
    let splitMsg = message.split(' ');
    client.say(to, "Working");
    if(splitMsg[0].startsWith(config.bot.commandPrefix)){
    //    Send to commandManager
    }
}

module.exports = {
    msgHandler: messageHandler
};