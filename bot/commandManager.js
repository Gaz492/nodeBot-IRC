/**
 * @author Gareth
 * Created on 17/04/2017.
 */
'use strict';

const mcCheck = require('./module/minecraft');
const colour = require('irc-colors');

function onCommand(bot, command, from, to, splitMsg) {
    if (command === "help") {
        bot.say(to, "Help is here!!!")
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
    else {
        bot.say(to, "Command not found");
    }
}

module.exports = {
    onCommand: onCommand
};