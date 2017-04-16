/**
 * @author Gareth
 * Created on 16/04/2017.
 */
var nconf = require('../configReader');

module.exports = {
    onCommand: function (client, command, to, from, args){
        if (command === "help") {
            if (args.length >= 1){
                client.notice(from, "Nothing here yet");
            }else{
                // var printCmdList = [];
                // for (var prop in cmdList) {
                //     if (cmdList.hasOwnProperty(prop)) {
                //         var splitCmd = cmdList[prop].split(",");
                //         printCmdList = printCmdList.concat(splitCmd);
                //     }
                // }
                client.notice(from, "Usage: .help <command>");
                client.notice(from, "Available Commands: help");
            }
        }
        else {
            client.say(to, "Command not found");
        }
    }
};