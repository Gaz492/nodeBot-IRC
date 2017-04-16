'use strict';

var nconf = require('../configReader');

var controlChar = nconf.get('bot').controlChar;

var cmdList = {
    "mcCheck": "paid,status",
    "customCommands": "setcmd,delcmd"
}

// Debug
var print = console.log;

function findValue(value, object) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop) && object[prop] === value) {
            return true;
        }
    }
    return false;
}

function loadPlugins(){
//    ToDo
}


module.exports = {
    registerCommand: function(plugin, command){
        if(!findValue(cmdList, command)){
            cmdList.plugin = command
        }
    },
    onCommand: function (event, client) {
        var msg = event.message.replace(controlChar, "").split(" ");
        var command = msg[0];
        var args = msg.slice(2);

        if (command == "help") {
            var printCmdList = [];
            for (var prop in cmdList) {
                if (cmdList.hasOwnProperty(prop)) {
                    var splitCmd = cmdList[prop].split(",")
                    printCmdList = printCmdList.concat(splitCmd);
                }
            }
            client.notice(event.nick, "Usage: .help <command>");
            client.notice(event.nick, "Available Commands: help," + printCmdList.toString());
        }
        else {
            client.say(event.target, "Command not found");
        }
    }
};