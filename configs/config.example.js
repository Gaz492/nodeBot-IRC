/**
 * @author Gareth
 * Created on 17/04/2017.
 */


const config = {
    server: {
        host: "irc.esper.net",
        port: 6667,
        password: "password",
        usePassword: false
    },
    channels: ["#gaz"],
    bot:{
        nick: "FTBBot-V2",
        userName: "FTBBot-V2",
        realName: "FTBBot-V2",
        nickServPass: "password",
        commandPrefix: ",",
        joinInvited: false
    },
    database: {
        hostname: "localhost",
        username: "ftbbot",
        database: "ircbot",
        password: "password"
    },
    plugins:{
        example: true
    },
    misc:{
        encoding: 'utf8',
        version: 'FTBBot-V2',
        enable_chghost: false,
        enable_echomessage: false,
        auto_reconnect: true,
        auto_reconnect_wait: 4000,
        auto_reconnect_max_retries: 3,
        ping_interval: 30,
        ping_timeout: 120
    }
};

module.exports = config;