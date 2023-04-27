module.exports = {
    help: {
        name: "pause",
        aliases: "",
        usage: "pause",
        desc: `Pauses the current song and queue.`
    },
    run: async (client, message, args2) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let queue = client.player.getQueue(message)
        if(!queue) return message.channel.send(`:x: | AirCon isn't on!`);
        await client.player.pause(message);
        return message.channel.send(`⏸ | Song paused!`);
    }
};