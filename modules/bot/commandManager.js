/**
 * @author Gareth
 * Created on 16/04/2017.
 */
const nconf = require('../configReader');
const colour = require('irc-colors');

const mcCheck = require('../core/mcCheck');

let cmdList = {"commandManager": "help"};
let isInit = false;

init();

function findValue(module, value, object) {
    for (let prop in object) {
        if (object.hasOwnProperty(prop) && object[prop] === value) {
            return true;
        }
    }
}

function init(){
    if(!isInit){
        registerCmd("commandManager", "help");
        registerCmd("mcCheck", "paid");
        registerCmd("mcCheck", "mcstatus");
    }
    isInit = true;
}

function registerCmd(module, command){
    if(!cmdList.hasOwnProperty(module)){
        if(!findValue(module, command, cmdList)){
            cmdList[module] = command;
        }
    }else{
        if(!findValue(module, command, cmdList)){
            cmdList.module = command;
        }
    }
}

function onCommand(client, command, to, from, args){
    if (command === "help") {
        if (args.length >= 1){
            client.notice(from, "Nothing here yet");
        }else{
            let printCmdList = [];
            for (let prop in cmdList) {
                if (cmdList.hasOwnProperty(prop)) {
                    let splitCmd = cmdList[prop].split(",");
                    printCmdList = printCmdList.concat(splitCmd);
                }
            }
            client.notice(from, "Usage: .help <command>");
            client.notice(from, "Available Commands: " + printCmdList.toString());
        }
    }
    else if(command === "paid"){
        mcCheck.checkPlayerName(args[0], function(data){
            if(data){
                let uuid = data.id;
                let name = data.name;

                client.say(to, "Username: " + colour.bold(name) + ", UUID: " + colour.bold(uuid) + ", Paid: " + colour.green.bold("TRUE"));
            }else{
                client.say(to, "No data for " + colour.bold(args[0]));
            }
        });
    }
    else if(command === "mcstatus"){
        mcCheck.checkMojangStatus(function(data){
            client.say(to, data)
        })
    }
    else {
        client.say(to, "Command not found");
    }
}

module.exports = {
    registerCmd: registerCmd,
    onCommand: onCommand

};