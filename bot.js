require('dotenv').config();
const Discord = require(`discord.js`);
const fs = require(`fs`)
const authorbot = `Nothing to see here....`;
const prefix = process.env.prefix;
const token = process.env.token;
const bicon = 'https://cdn.discordapp.com/attachments/705817863361134696/1096535255822893066/Ac2.png';
const botcolor = "#130622";
const authicon = 'https://cdn.discordapp.com/attachments/705817863361134696/1096535255822893066/Ac2.png';
//Database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('stats.db');

//Client init
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES"],
})
//Distube init
const Distube = require(`distube`)
client.player = new Distube.default(client, {
    searchSongs: 1,
    searchCooldown: 2,
    leaveOnEmpty: true,
    emptyCooldown: 30,
    leaveOnFinish: true,
    nsfw: true,
    leaveOnStop: true, // Find 30 second cooldown after finished queue
    youtubeDL: false
})
//Starting bot


client.once("ready", () => {
    console.log(`AirCon is grooving!\nServers: ${client.guilds.cache.size}`);
    client.user.setPresence({
        activities: [{
            name: ' music 🎶',
            type: "LISTENING"
        }],
        status: 'idle'
    });
})
//Loading commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(`./commands/music/`, (err, files) => {
    if (err) throw err
    console.log(`[Commandlogs] Loaded ${files.length} commands of module [Music]`)

    let jsfile = files.filter(fe => fe.split(".").pop() === "js")
    if (jsfile.length <= 0) return console.log("Couldn't locate any commands!")

    jsfile.forEach(f => {
        const props = require(`./commands/music/${f}`);
        client.commands.set(props.help.name, props)
        client.aliases.set(props.help.aliases, props)
    })
})

client.on("messageCreate", message => {
    //Message filtering
    if (message.channel.type === "dm") return console.log(`Messaged by ${message.author.tag}`);
    if (message.author.bot) return;
    if (!message.guild) return;
    //Setting up message components
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray;
    if (message.content.startsWith(prefix)) {
        if (cmd.slice(prefix.length)) {

            let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.aliases.get(cmd.slice(prefix.length));
            if (commandfile) {
                commandfile.run(client, message, args, prefix, botcolor, bicon, authorbot, authicon)
                db.serialize(() => {

                    db.get(`SELECT * FROM Statistics WHERE UserID = ?`, message.author.id, (err, row) => {
                        if (row == undefined) {
                            db.run(`UPDATE Statistics SET NoOfCommands = NoOfCommands+1 WHERE UserID = ?`, message.author.id)
                        } else {
                            db.run(`UPDATE Statistics SET NoOfCommands = NoOfCommands+1 WHERE UserID = ?`, message.author.id)
                        }
                    })

                })

            }
        }
    }

})
//Distube Events:
let npembed = new Discord.MessageEmbed()
    .setColor(botcolor)
client.player.on('error', (channel, error) => {
        let errorembed = new Discord.MessageEmbed()
            .setTitle(`An error occured while playing`)
            .setDescription(error.toString().split("\n")[0])
            .setColor(`#ff0000`)
        channel.send({
            embeds: [errorembed]
        }) // Discord limits 2000 characters in a message
        console.log(error)
    })
    .on("playSong", (queue, song) => {
        db.serialize(() => {
            CurrentDate = Date.now()
            // FormatedDate = `${CurrentDate.getUTCDate()}-${CurrentDate.getUTCMonth()}-${CurrentDate.getUTCFullYear()}`
            db.run(`INSERT INTO queue(Date, Song) VALUES(?,?)`, [CurrentDate, song.name])
        })
        console.log()
        npembed.setDescription(`Now playing [${song.name}](${song.url})`)
        queue.textChannel.send({
                embeds: [npembed]
            }).then(msg => {
                setTimeout(() => msg.delete(), 600000)
            })
            .catch(err => console.log(err))
    })

    .on("addSong", (queue, song) => {
        if (queue.songs.length > 1) {
            npembed.setDescription(`Added [${song.name}](${song.url}) to queue!`)
            queue.textChannel.send({
                embeds: [npembed]
            })
        }
    })
    .on('searchNoResult', message => {
        let noresults = new Discord.MessageEmbed()
            .setColor(`#ff0000`)
            .setDescription(`No results found!`)
        message.channel.send({
            embeds: [noresults]
        })
    })




client.login(token)