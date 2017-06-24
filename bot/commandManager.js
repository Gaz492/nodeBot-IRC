/**
* @author Gareth
* Created on 17/04/2017.
*/
'use strict';
import mcCheck from './module/minecraft';
import colour from 'irc-colors';

function onCommand(bot, command, from, to, splitMsg) {

    switch(command){
        case "help":
            if (splitMsg.length > 1){
                bot.notice(from, "Nothing here yet");
            }else{
                bot.notice(from, "Usage: .help [command]");
                bot.notice(from, "Available Commands: paid,mcstatus");
            }
            break;

        case "paid":
            mcCheck.checkPlayerName(splitMsg[1], function (data) {
                if (data) {
                    let uuid = data.id;
                    let name = data.name;
                    
                    bot.say(to, "Username: " + colour.bold(name) + ", UUID: " + colour.bold(uuid) + ", Paid: " + colour.green.bold("TRUE"));
                } else {
                    bot.say(to, "No data for " + colour.bold(splitMsg[1]));
                }
            });
            break;

        case "mcstatus":
            mcCheck.checkMojangStatus(function (data) {
                bot.raw("PRIVMSG", to, data)
            })
            break;

        case "who":
            bot.whois(splitMsg[1], function(callback){
                console.log(callback);
            })
            break;

        default:
            bot.say(to, "Command not found");
    }
}

module.exports = {
    onCommand: onCommand
};