/**
 * @author Gareth
 * Created on 17/04/2017.
 */
'use strict';

const request = require('request');
const vsprintf = require('sprintf-js').vsprintf;
const colour = require('irc-colors');

const status_friendly_names = {
    "minecraft.net": " Minecraft.net",
    "account.mojang.com": "Mojang accounts website",
    "authserver.mojang.com": "Mojang auth server",
    "sessionserver.mojang.com": "Multiplayer session server",
    "textures.minecraft.net": "Minecraft texture",
    "api.mojang.com": "Public API",
    "session.minecraft.net": "Legacy session",
    "auth.mojang.com": "Mojang authentication",
    "skins.minecraft.net": "Minecraft skins",
    "mojang.com": "Mojang website"
};

module.exports = {
    checkPlayerName: function (playerName, callback) {
        const url = 'https://api.mojang.com/users/profiles/minecraft/';

        request({
            url: url + playerName,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                callback(body);
            } else {
                callback(false);
            }
        })
    },
    checkUUID: function (uuid, callback) {
        const url = 'https://sessionserver.mojang.com/session/minecraft/profile/';

        request({
            url: url + uuid,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                callback(body);
            } else {
                callback(false);
            }
        })
    },
    checkMojangStatus: function (callback) {
        const url = 'https://status.mojang.com/check';

        request({
            url: url,
            json: true
        }, function (error, response, data) {
            if (!error && response.statusCode === 200) {

                let offline = [];
                let problems = [];
                let online = [];
                let times = 0;
                let message = "";

                data.forEach(function (element) {
                    for (let key in element) {
                        if (element[key] === "green") {
                            online.push(status_friendly_names[key]);
                        } else if (element[key] === "yellow") {
                            problems.push(status_friendly_names[key]);
                        } else {
                            offline.push(status_friendly_names[key]);
                        }
                    }
                });
                for (let i in online) {
                    if (times === 0) {
                        message += vsprintf("%s: %s ", [online[i], colour.green.bold("Online")])
                    } else {
                        message += vsprintf("| %s: %s ", [online[i], colour.green.bold("Online")])
                    }
                    times += 1;
                }
                for (let i in problems) {
                    if (times === 0) {
                        message += vsprintf("%s: %s ", [problems[i], colour.olive.bold("Problems")])
                    } else {
                        message += vsprintf("| %s: %s ", [problems[i], colour.olive.bold("Problems")])
                    }
                    times += 1;
                }
                for (let i in offline) {
                    if (times === 0) {
                        message += vsprintf("%s: %s ", [offline[i], colour.red.bold("Offline")])
                    } else {
                        message += vsprintf("| %s: %s ", [offline[i], colour.red.bold("Offline")])
                    }
                    times += 1;
                }
                callback("Mojang status: " + message)
            } else {
                callback(false);
            }
        })
    },
    autoStatus: function (callback) {
        const url = 'https://status.mojang.com/check';

        let statuses = {
            "minecraft.net": " ???",
            "account.mojang.com": " ???",
            "authserver.mojang.com": " ???",
            "sessionserver.mojang.com": " ???",
            "textures.minecraft.net": " ???",
            "api.mojang.com": " ???",
            "session.minecraft.net": " ???",
            "auth.mojang.com": " ???",
            "skins.minecraft.net": " ???",
            "mojang.com": " ???"
        };

        request({
            url: url,
            json: true
        }, function (error, response, data) {
            if (!error && response.statusCode === 200) {

                let offline = [];
                let problems = [];
                let online = [];

                let parsed_status = {};

                let times = 0;
                let message = "";

                data.forEach(function (element) {
                    for (let key in element) {
                        parsed_status[key] = element[key];
                        if (statuses[key] !== element[key]) {
                            if (element[key] === "green") {
                                online.push(status_friendly_names[key]);
                            } else if (element[key] === "yellow") {
                                problems.push(status_friendly_names[key]);
                            } else {
                                offline.push(status_friendly_names[key]);
                            }
                        }
                    }
                });
                for (let i in online) {
                    if (times === 0) {
                        message += vsprintf("%s: %s ", [online[i], colour.green.bold("Online")])
                    } else {
                        message += vsprintf("| %s: %s ", [online[i], colour.green.bold("Online")])
                    }
                    times += 1;
                }
                for (let i in problems) {
                    if (times === 0) {
                        message += vsprintf("%s: %s ", [problems[i], colour.olive.bold("Problems")])
                    } else {
                        message += vsprintf("| %s: %s ", [problems[i], colour.olive.bold("Problems")])
                    }
                    times += 1;
                }
                for (let i in offline) {
                    if (times === 0) {
                        message += vsprintf("%s: %s ", [offline[i], colour.red.bold("Offline")])
                    } else {
                        message += vsprintf("| %s: %s ", [offline[i], colour.red.bold("Offline")])
                    }
                    times += 1;
                }

                if(times !== 0){
                    callback("Mojang status: " + message);
                }
                statuses = parsed_status;
            } else {
                callback("Nothing");
            }
        })
    }
};