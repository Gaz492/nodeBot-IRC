/**
* @author Gareth
* Created on 17/04/2017.
*/
'use strict';

const mcCheck = require('./module/minecraft');
const colour = require('irc-colors');

function onCommand(bot, command, from, to, splitMsg) {
    if (command === "help") {
        if (args.length >= 1){
            bot.notice(from, "Nothing here yet");
        }else{
            bot.notice(from, "Usage: .help <command>");
            bot.notice(from, "Available Commands: paid,mcstatus");
        }
    }
    else if (command === "paid") {
        mcCheck.checkPlayerName(splitMsg[1], function (data) {
            if (data) {
                let uuid = data.id;
                let name = data.name;
                
                bot.say(to, "Username: " + colour.bold(name) + ", UUID: " + colour.bold(uuid) + ", Paid: " + colour.green.bold("TRUE"));
            } else {
                bot.say(to, "No data for " + colour.bold(splitMsg[1]));
            }
        });
    }
    else if (command === "mcstatus") {
        mcCheck.checkMojangStatus(function (data) {
            bot.raw("PRIVMSG", to, data)
        })
    }
    else if (command === "who"){
        bot.whois(splitMsg[1], function(callback){
            console.log(callback);
        })
    }
    else {
        bot.say(to, "Command not found");
    }
}

module.exports = {
    onCommand: onCommand
};