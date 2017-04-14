'use strict';

var nconf = require('../configReader');

var controlChar = nconf.get('bot').controlChar;

var cmdList = [];

function loadPlugins(){
//    ToDo
}


module.exports = {
    onCommand: function (event, client) {
        var msg = event.message.replace(controlChar, "").split(" ");
        var command = msg[0];
        var args = msg.slice(2);

        if (command == "help") {
            client.notice(event.nick, "Usage: .help <command>");
            client.notice(event.nick, "Available Commands: help, " + cmdList);
        }
        else {
            client.say(event.target, "Command not found");
        }
    }
};