const Discord = require(`discord.js`)

module.exports = {
    help: {
        name: "filter",
        aliases: "",
        usage: "filter",
        desc: `Adds filters to current song!`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot) => {

        let query = message.content.substring(args[0].length + 1);
        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");


            let startembed = new Discord.MessageEmbed()
                .setColor(botcolor)
                .setAuthor({name:`Sound Board`})
                .setThumbnail(bicon)
                .setDescription(`Please select a button!`)

            let bassboostbut = new Discord.MessageButton()
                .setCustomId('3d')
                .setLabel('3D')
                .setStyle('SECONDARY');
            let nighcorebut = new Discord.MessageButton()
                .setCustomId('nightcore')
                .setLabel('NightCore')
                .setStyle('SECONDARY');
            let reversebut = new Discord.MessageButton()
                .setCustomId('reverse')
                .setLabel('Reverse')
                .setStyle('SECONDARY')
            let disablebut = new Discord.MessageButton()
                .setCustomId('disable')
                .setLabel('Disable')
                .setStyle('DANGER');
            const row = new Discord.MessageActionRow()
                .addComponents(
                    bassboostbut,
                    nighcorebut,
                    reversebut,
                    disablebut
                )
            let msg = await message.channel.send({
                embeds: [startembed],
                components:[row]
            })
            const filter = i => (i.customId === '3d' || i.customId === 'nightcore'|| i.customId === 'reverse'|| i.customId === 'disable') && i.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({
              filter,
              time: 600000
          });

            
        
        
        
            collector.on('collect', async i => {
                let editembed = new Discord.MessageEmbed()
                .setColor(botcolor)
                if(i.customId === '3d') 
                {
                    const filter2 = client.player.setFilter(message, `3d`)
                    editembed.setDescription(`Filter set to **3D**`)

                } else if(i.customId === 'nightcore')
                {
                    const filter2 = client.player.setFilter(message, `nightcore`)
                    editembed.setDescription(`Filter set to **NightCore**`)

                } else if(i.customId === 'reverse')
                {
                    const filter2 = client.player.setFilter(message, `reverse`)
                    editembed.setDescription(`Filter set to **Reverse**`)

                } else if(i.customId === 'disable')
                {
                    const filter2 = client.player.setFilter(message, false)
                    editembed.setDescription(`Filter set to **Disabled**`)

                }

                if(i) {
                    

                    await msg.delete()
                    message.channel.send(({embeds: [editembed]}))
                    collector.stop()
                }        
            })






    }
};