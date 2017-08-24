/**
* @author Gareth
* Created on 17/04/2017.
*/
'use strict';
import config from '../configs/config';
import mcCheck from './module/minecraft';
import colour from 'irc-colors';
import sprintf from 'sprintf-js';

const vsprintf = sprintf.vsprintf;
const cmdPrefix = config.bot.commandPrefix;

function onCommand(bot, command, from, to, splitMsg) {

    switch(command){
        case "help":
            if (splitMsg.length > 1){
                bot.notice(from, "Nothing here yet");
            }else{
                bot.notice(from, vsprintf("Usage: %shelp [command]", cmdPrefix));
                bot.notice(from, "Available Commands: paid,mcstatus");
            }
            break;

        case "paid":
            if (splitMsg.length > 1){
                mcCheck.checkPlayerName(splitMsg[1], function (data) {
                    if (data) {
                        let uuid = data.id;
                        let name = data.name;

                        bot.say(to, "Username: " + colour.bold(name) + ", UUID: " + colour.bold(uuid) + ", Paid: " + colour.green.bold("TRUE"));
                    } else {
                        bot.say(to, "No data for " + colour.bold(splitMsg[1]));
                    }
                });
            }else{
                bot.say(to, vsprintf("Usage: %spaid [username]", cmdPrefix))
            }

            break;

        case "mcstatus":
            mcCheck.checkMojangStatus(function (data) {
                bot.raw("PRIVMSG", to, data)
            });
            break;

        case "who":
            bot.whois(splitMsg[1], function(callback){
                console.log(callback);
            });
            break;

        default:
            console.log("No command")
    }
}

module.exports = {
    onCommand: onCommand
};