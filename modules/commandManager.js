const bot = require('../app');
module.exports = {
    commandManager: function(command, from, to, args){
        if (command == "help") {
            bot.sendNotice(from, "Usage: .help <command>");
            bot.sendNotice(from, "Available Commands: help, " + cmdList);
        }
        else {
            bot.sendMessage(to, "Command not found");
        }
    }
}