'use strict';

var nconf = require('./configReader');

var controlChar = nconf.get('bot').controlChar;

module.exports = {
    ircCore: function() {
	return function(client, raw_events, parsed_events) {
        if(parsed_events.type === "privmsg"){
            parsed_events.use(checkCommand);
        }
    };

	function checkCommand(command, event, client, next) {

		// console.log('[CheckCommand]', command, event);
        console.log(command)
		// message = event.message;
        // if(message.startsWith(controlChar)){
        //     var msg = message.replace(controlChar, "").split(" ");
        //     var command = msg[0];
        //     var args = msg.slice(2);

        //     if (command == "help") {
        //         client.notice(event.nick, "Usage: .help <command>");
        //         client.notice(event.nick, "Available Commands: help, " + cmdList);
        //     }
        //     else {
        //         client.say(event.target, "Command not found");
        //     }
        // }

		next();
	}
}
}