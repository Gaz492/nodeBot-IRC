/**
 * @author Gareth
 * Created on 17/04/2017.
 */
import client from './bot/core';
import config from './configs/config';

client.connect({
    host: config.server.host,
    nick: config.bot.nick,
    username: config.bot.userName,
    gecos: config.bot.realName,
    encoding: config.misc.encoding,
    version: config.misc.version,
    enable_chghost: config.misc.enable_chghost,
    enable_echomessage: config.misc.enable_echomessage,
    auto_reconnect: config.misc.auto_reconnect,
    auto_reconnect_wait: config.misc.auto_reconnect_wait,
    auto_reconnect_max_retries: config.misc.auto_reconnect_max_retries,
    ping_interval: config.misc.ping_interval,
    ping_timeout: config.misc.ping_timeout
});
console.log("Connecting to %s ...", config.server.host);