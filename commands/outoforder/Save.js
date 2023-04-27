let Discord = require(`discord.js`)
const fs = require('fs');
const queue = require('./queue');

module.exports = {
    help: {
        name: "save",
        aliases: "",
        usage: "save",
        desc: `Saves the queue.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot, authicon) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let currentQueue = client.player.getQueue(message)
        if (!currentQueue) return message.channel.send(`:x: | AirCon isn't on!`);
        let queue = []
        currentQueue.songs.forEach(element => {
            queue.push(element.url)
        });
        let Queues = JSON.parse(fs.readFileSync('./json/queue.json', 'utf8'));
            Queues[message.guild.id] = {
                Queues: queue
        };
        fs.writeFile('./json/queue.json', JSON.stringify(Queues), (err) =>{
            if (err) console.log(err)
        });

        let savedQueue = new Discord.MessageEmbed()
            .setColor(botcolor)
            .setDescription("**:white_check_mark: | Saved `" + currentQueue.songs.length + "` songs!**")
        message.channel.send({embeds: [savedQueue]})
        

    }
};