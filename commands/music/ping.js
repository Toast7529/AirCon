const Discord = require('discord.js');
module.exports.run = async (bot, message, args, prefix, botcolor, bicon, authorbot) => {
    const msg = await message.channel.send(`Pinging...`);
    msg.edit(`🏓Pong\n__**Latency is:**__ \n${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\n __**API Latency**__ \n${Math.round(bot.ws.ping)}ms`)
}

module.exports.help = {
 name: "ping",
 aliases: "pong",
 usage: "ping",
 desc: `Shows latency.`
}