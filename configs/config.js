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
        commandPrefix: ","
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
        autoRejoin: false,
        autoConnect: true,
        secure: false,
        floodProtection: false,
        floodProtectionDelay: 1000,
        sasl: false,
        retryCount: 3,
        retryDelay: 2000,
        showErrors: false,
        debug: false
    }
};

module.exports = config;