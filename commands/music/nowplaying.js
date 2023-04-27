const Discord = require(`discord.js`)
const progressbar = require('string-progressbar');

module.exports = {
    help: {
        name: "nowplaying",
        aliases: "np",
        usage: "nowplaying ",
        desc: `Displays current info about the song.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot, authicon) => {
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | I am not in your voice channel!");
        let queue = await client.player.getQueue(message.guild.id);
        if (!queue) return message.channel.send(`:x: | AirCon isn't on!`);

        // Buttons:
        let previousButton = new Discord.MessageButton()
            .setCustomId('previous')
            .setEmoji('⏪')
            .setStyle('SECONDARY');
        let skipButton = new Discord.MessageButton()
            .setCustomId('skip')
            .setEmoji('⏩')
            .setStyle('SECONDARY');
        let loopButton = new Discord.MessageButton()
            .setCustomId('loop')
            .setEmoji('🔂')
            .setStyle('SECONDARY')
        let shuffleButton = new Discord.MessageButton()
            .setCustomId('shuffle')
            .setEmoji('🔀')
            .setStyle('SECONDARY')

        const row = new Discord.MessageActionRow()
            .addComponents(
                previousButton,
                skipButton,
                loopButton,
                shuffleButton
            )

        function generateEmbed(queue, pos) {
            song = queue.songs[pos]
            current = Math.floor(queue.currentTime)
            total = queue.songs[pos].duration
            nowPlaying = new Discord.MessageEmbed()
                .setDescription(`[${song.name}](${song.url})\n Duration: ${song.formattedDuration} \n${progressbar.splitBar(total, current, size=15)[0]}`)
                .setThumbnail(song.thumbnail)
                .setColor(botcolor)
            return nowPlaying
        }

        let msg = await message.channel.send({
            embeds: [generateEmbed(queue, 0)],
            components: [row]
        })
        const filter = i => (i.customId === 'previous' || i.customId === 'skip' || i.customId === 'loop' || i.customId === 'shuffle') && i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({
            filter,
            time: 600000
        });

        collector.on('collect', async i => {

            if (i.customId === 'previous') {
                try {
                    await queue.previous()
                } catch (err) {
                    return message.react('❌')
                }
            } else if (i.customId === 'skip') {
                await client.player.skip(message);

            } else if (i.customId === 'loop') {
                await client.player.setRepeatMode(message, 1);

            } else if (i.customId === 'shuffle') {
                await client.player.shuffle(message)
            }
            if (i && i.customId != 'loop' || i.customId != 'shuffle') {
                await i.update({
                    embeds: [generateEmbed(await client.player.getQueue(message.guild.id), 1)],
                    components: [row]
                })
            } else {
                await i.update({
                    embeds: [generateEmbed(await client.player.getQueue(message.guild.id), 0)],
                })
            }


        })




    }
};