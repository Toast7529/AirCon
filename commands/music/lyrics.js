require('dotenv').config();
const Discord = require(`discord.js`)
const genius = require("genius-lyrics");
const Genius = new genius.Client(process.env.geniusKey);
const getArtistTitle = require('get-artist-title')


module.exports = {
    help: {
        name: "lyric",
        aliases: "lyrics",
        usage: "lyric",
        desc: `Shows the lyrics.`
    },
    run: async (client, message, args, prefix, botcolor, bicon, authorbot) => {


        if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | I am not in your voice channel!");
        let queue = await client.player.getQueue(message.guild.id);
        if (!queue) return message.channel.send(`:x: | AirCon isn't on!`);
        try {


            CurrentSong = queue.songs[0]

            try {
                SongName = getArtistTitle(CurrentSong.name).pop().replace(/[^a-zA-Z0-9:\/\\\[\]\{\}\(\)]/g, ' ').split("   ")[0].toLowerCase().replace(/(\s*(official|audio|video|lyric)(\s+version)?)|(\s*\|\s*)/gi,"").split("(")[0].trim()//.toLowerCase().replace("official", "").replace("lyric", "")
                // console.log(`Formatted: ${CurrentSong.name} --> ${SongName.length}`)
                if (SongName.length == 0) {
                    SongName = CurrentSong.name
                }
            } catch(err) {
                SongName = CurrentSong.name
                console.log(err)
                // message.channel.send(`:x: | Lyrics not found!`)
            }


            const searches = await Genius.songs.search(message.content.substring(args[0].length + 1) || SongName)
            SongInfo = searches[0]

            if (!SongInfo) {
                message.channel.send(`:x: | Lyrics not found!`)
            } else {
                lyrics = await SongInfo.lyrics()
                let wordcount = lyrics.split("")
                if(wordcount.length > 4096) {
                    lyrics = lyrics.substring(0, 2094) + "…"
                    console.log(lyrics)
                }
                let lyricembed = new Discord.MessageEmbed()
                    .setTitle(SongInfo.featuredTitle)
                    .setDescription(`${SongInfo.artist.name} \n\n ${lyrics}`)
                    .setThumbnail(CurrentSong.thumbnail)
                    .setColor(botcolor)
                    .setFooter({text:`Lyrics provided by AirCon.`})
		        message.channel.send({embeds: [lyricembed]})
            }




        } catch (error) {
            console.log(error)
            message.channel.send(`:x: | An error has occurred while playing!`)
        }





    }
    
};
