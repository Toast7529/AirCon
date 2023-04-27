const Discord = require('discord.js');

module.exports = {
    help: {
        name: "help",
        aliases: "",
        usage: "help",
        desc: `Show the help command.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot) => {

        commands = [
            `Play - Play {query}`,
            `Stop - Disconnects the bot`,
            `Queue - Display's server queue`,
            `Skip - Skip's to next song`,
            `Pause - Pause's current song`,
            `Resume - Resume's current song`,
            `Clear - Clears every song in queue`,
            `Loop - Selects a loop mode`,
            `Lyrics - Display's lyrics of some songs`,
            `Shuffle - Shuffle's the playlist`,
            `Filter - Add some filters to current song`,
            `NP - Display's current song`,
            `Ping - Show's trash ping`
        ].join("\n")
        let embed  = new Discord.MessageEmbed()
        .setColor(botcolor)
        .setAuthor(`AirCon`, authorbot)
        .setFooter({text:`Created by Toast#7529`, iconURL:authorbot})
        .setDescription(`Prefix: !\n You probably knew that as you executed this command..`)
        .addField(`Commands:`,commands)
       message.channel.send({embeds:[embed]});
    }
};