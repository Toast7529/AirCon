module.exports = {
    help: {
        name: "stop",
        aliases: "",
        usage: "stop",
        desc: `Stops the current song and queue.`
    },
    run: async (client, message, args2) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let queue = await client.player.getQueue(message.guild.id);
        if (!queue) return message.channel.send(":x: | Music player is not in use!");

        await queue.stop(message.guild.id);
        return message.channel.send(`✅ | Turned off the AC!`);
    }
};