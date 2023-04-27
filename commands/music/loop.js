const Discord = require(`discord.js`)
const {
    RepeatMode
} = require('discord-music-player');

module.exports = {
    help: {
        name: "loop",
        aliases: "l",
        usage: "loop",
        desc: `Loops the current song.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot, authicon) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let queue = client.player.getQueue(message)
        if (!queue) return message.channel.send(`:x: | AirCon isn't on!`);

        let queuebutton = new Discord.MessageButton()
            .setCustomId('queue')
            .setLabel('Queue')
            .setStyle('SECONDARY');
        let songbutton = new Discord.MessageButton()
            .setCustomId('song')
            .setLabel('Song')
            .setStyle('SECONDARY')
        let disablebutton = new Discord.MessageButton()
            .setCustomId('disable')
            .setLabel('Disable')
            .setStyle('DANGER');
        const row = new Discord.MessageActionRow()
            .addComponents(
                queuebutton,
                songbutton,
                disablebutton,

            )

        let msg = await message.channel.send({
            content: `Select a loop option!`,
            components: [row]
        })
        const filter = i => (i.customId === 'queue' || i.customId === 'song' || i.customId === 'disable') && i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({
            filter,
            time: 600000
        });


        collector.on('collect', async i => {
            let loopembed = new Discord.MessageEmbed()
                .setColor(botcolor)
            if (i.customId === 'queue') {
                loopembed.setDescription(`Now looping the **queue.**`)
                await client.player.setRepeatMode(message, 2)
            } else if (i.customId === 'song') {
                loopembed.setDescription(`Now looping the **current track.**`)
                await client.player.setRepeatMode(message, 1);

            } else if (i.customId === 'disable') {
                loopembed.setDescription(`Looping is now **disabled**`)
                await client.player.setRepeatMode(message, 0);
            }
            if (i) {
                await i.update({
                    embeds: [loopembed]
                })
            }


        })

    }
};