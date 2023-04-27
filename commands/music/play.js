const Discord = require(`discord.js`)

module.exports = {
    help: {
        name: "play",
        aliases: "p",
        usage: "play **[URL or Song Name]**",
        desc: `Plays the URL.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot) => {

        let query = message.content.substring(args[0].length + 1);
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
            if (!query) return message.channel.send(`:x: | Please provide a search query!`);
            client.player.play(message.member.voice.channel, query, {
                textChannel: message.channel,
                message
            })
            



    }
};