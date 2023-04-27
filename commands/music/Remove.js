let Discord = require(`discord.js`)
module.exports = {
    help: {
        name: "remove",
        aliases: "",
        usage: "remove",
        desc: `Removes the selected song.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot, authicon) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let queue = client.player.getQueue(message)
        if (!queue) return message.channel.send(`:x: | AirCon isn't on!`);
        if (isNaN(args[1])) return message.channel.send(':x: | Please use a number!')
        if ((args[1]) > queue.songs.length || args[1] <= 1) return message.channel.send(`Please choose a number in the queue!`)
        let removed = queue.songs[parseInt(args[1] - 1)]
        const newqueue = queue.songs.filter(song => song !== queue.songs[parseInt(args[1] - 1)])
        queue.songs = newqueue
        let removedEmbed = new Discord.MessageEmbed()
            .setDescription(`Removed [${removed.name}](${removed.url})`)
            .setColor(botcolor)
        return message.channel.send({
            embeds: [removedEmbed]
        });

    }
};