// Initialize Requirements
var irc = require('irc-framework');
var nconf = require('./modules/configReader');
var util = require('util');
var walk = require('walk');

// Custom
var ircCore = require('./modules/irc/core');



// Initialize IRC Connection

var client = new irc.Client();
var controlChar = nconf.get('bot').controlChar;

client.connect({
    host: nconf.get('connection').host,
    nick: nconf.get('bot').nick,
    username: nconf.get('bot').userName,
    gecos: nconf.get('bot').realName,
    encoding: nconf.get('bot').encoding,
    version: nconf.get('bot').version,
    enable_chghost: nconf.get('bot').enable_chghost,
    enable_echomessage: nconf.get('bot').enable_echomessage,
    auto_reconnect: nconf.get('bot').auto_reconnect,
    auto_reconnect_wait: nconf.get('bot').auto_reconnect_wait,
    auto_reconnect_max_retries: nconf.get('bot').auto_reconnect_max_retries,
    ping_interval: nconf.get('bot').ping_interval,
    ping_timeout: nconf.get('bot').ping_timeout
})

client.on('registered', function() {
	console.log('Connected!');
    for(var i in nconf.get('channels')){
        console.log(nconf.get('channels')[i]);
        client.join(nconf.get('channels')[i]);
    }
});

client.on('close', function() {
	console.log('Connection close');
});

client.on('message', function(event) {
    console.log(event.target + ' | ' + event.nick + ': ' + event.message)
    if(event.message.startsWith(controlChar)) {
        ircCore.onCommand(event, client)
    }
});

client.on('whois', function(event) {
	// console.log(event);
});

client.on('join', function(event) {
	// console.log('user joined', event);
});

client.on('userlist', function(event) {
	// console.log('userlist for', event.channel, event.users);
});

client.on('part', function(event) {
	// console.log('user part', event);
});

// client.on('topic', function(event) {
// 	console.log(event);
// });