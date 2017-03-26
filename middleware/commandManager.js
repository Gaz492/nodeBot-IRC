const bot = require('../app');
module.exports = {
    commandManager: function(command, from, to, args){
        if (command == "help") {
            bot.bot.notice(from, "Usage: .help <command>");
            bot.notice(from, "Available Commands: help, " + cmdList);
        }
        else {
            bot.say(to, "Command not found");
        }
    }
}