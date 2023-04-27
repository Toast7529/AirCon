module.exports = {
    help: {
        name: "bump",
        aliases: "skipto",
        usage: "bump [number]",
        desc: `Skips to the song...`
    },
    run: async (client, message, args, prefix, bicon, botcolor, authorbot) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | I am not in your voice channel!");
        let queue = client.player.getQueue(message)
        if(!queue) return message.channel.send(`:x: | AirCon isn't on!`);

        let position = message.content.substring(args[0].length + 1);
        if (isNaN(parseInt(position)) || parseInt(position) > queue.songs.length || parseInt(position) < 1) return message.channel.send(`:x: | Provide a number **(1-${queue.songs.length})**!`);
        await client.player.jump(message, parseInt(position-1)).then(song => {
            message.react(`👍`)
        })
        
    }
};