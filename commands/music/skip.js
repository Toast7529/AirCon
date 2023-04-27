module.exports = {
    help: {
        name: "skip",
        aliases: "",
        usage: "skip",
        desc: `Skips the current song.`
    },
    run: async (client, message, args2) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let queue = client.player.getQueue(message)
        if(!queue) return message.channel.send(`:x: | AirCon isn't on!`);
        await client.player.skip(message);
        return message.react("👌")
    }
};