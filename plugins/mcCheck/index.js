/**
 * Created by gareth on 15/04/2017.
 */

'use strict';

const request = require('request');

module.exports = {
    checkValidPlayerName: function(playerName){
        const url = 'https://api.mojang.com/users/profiles/minecraft/';

        request({
            url: url + playerName,
            json: true
        }, function (error, response, body){
            if(!error && response.statusCode === 200){
                return body;
            }else{
                return false;
            }
        })
    },
    checkValidUUID: function (uuid) {
        const url = 'https://sessionserver.mojang.com/session/minecraft/profile/';

        request({
            url: url + uuid,
            json: true
        }, function (error, response, body){
            if(!error && response.statusCode === 200){
                return body;
            }else{
                return false;
            }
        })
    }
};