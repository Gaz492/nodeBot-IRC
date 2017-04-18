/**
* @author Gareth
* Created on 17/04/2017.
*/
'use strict';

const config = require('../configs/config');
const cmdManager = require('./commandManager');

function messageHandler(bot, from, to , message){
    let splitMsg = message.split(' ');
    let command = splitMsg[0].replace(config.bot.commandPrefix, '');
    
    if(splitMsg[0].startsWith(config.bot.commandPrefix)){
        cmdManager.onCommand(bot, command, from, to, splitMsg)
    }
}

module.exports = {
    msgHandler: messageHandler
};