
const Discord = require(`discord.js`)

module.exports = {
    help: {
        name: "clear",
        aliases: "",
        usage: "clear ",
        desc: `Clears the queue.`
    },
    run: async (client, message, args2, prefix, bicon, botcolor, authorbot) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | I am not in your voice channel!");
        let queue = client.player.getQueue(message)
        if(!queue) return message.channel.send(`:x: | AirCon isn't on!`);
        queue.songs = [queue.songs[0]]
        return message.channel.send(`✅ | Queue cleared!`)





    }
};