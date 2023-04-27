

const Discord = require(`discord.js`)

module.exports = {
  help: {
    name: "shuffle",
    aliases: "",
    usage: "shuffle ",
    desc: `Shuffles current queue.`
  },
  run: async (client, message, args, prefix, botcolor, bicon, authorbot, authicon) => {
    if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | I am not in your voice channel!");
    let queue = client.player.getQueue(message)
    if(!queue) return message.channel.send(`:x: | AirCon isn't on!`);

    client.player.shuffle(message)
    let queueembed = new Discord.MessageEmbed()
    .setColor(botcolor)
    .setTitle(`Queue shuffled!`)
    message.channel.send({embeds:[queueembed]})


    




  }
};