const Discord = require(`discord.js`)

module.exports = {
  help: {
    name: "queue",
    aliases: "q",
    usage: "queue ",
    desc: `Displays current queue.`
  },
  run: async (client, message, args, prefix, botcolor, bicon, authorbot, authicon) => {
    if (!message.member.voice.channel) return message.channel.send(":x: | You are not in a voice channel!");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | I am not in your voice channel!");
    let queue = await client.player.getQueue(message.guild.id);
    if (!queue) return message.channel.send(`:x: | AirCon isn't on!`);
    const serverqueue = queue.songs
    // console.log(serverqueue)
    let queuechunks = []
    for (let index = 0; index < serverqueue.length; index++) {
      const song = serverqueue[index];
      if (queuechunks.length <= [Math.floor(index / 10)]) queuechunks.push([]);
      queuechunks[Math.floor(index / 10)].push(song)

    }

    let pagestrings = []
    let strName = "";

    queuechunks.forEach(page => {
      const pagenumber = queuechunks.indexOf(page);

      pagestrings.push(["```ml\n"]);

      page.forEach(song => {
        if (song.name.length > 39) {
          strName = song.name.substring(0, 37);
          strName += "… ";
        } else {
          let neededspace = 39 - song.name.length
          strName = song.name
          for (i = 0; i < neededspace; i++) {
            strName += " "
          }
        }
        if (song.formattedDuration === `00:00`) {
          pagestrings[pagenumber].push(`${(serverqueue.indexOf(song)) + 1}) ${strName} ∞`)
        } else {
          pagestrings[pagenumber].push(`${(serverqueue.indexOf(song)) + 1}) ${strName} ${song.formattedDuration}`)
        }
      })

      pagestrings[pagenumber].push(["```"]);

    })





    let firstbutton = new Discord.MessageButton() // Next
      .setCustomId('first')
      .setLabel('First')
      .setStyle('SECONDARY');
    let nextbutton = new Discord.MessageButton() // Next
      .setCustomId('next')
      .setLabel('Next')
      .setStyle('SECONDARY');
    let backbutton = new Discord.MessageButton() // back
      .setCustomId('back')
      .setLabel('Back')
      .setStyle('SECONDARY')
    let lastbutton = new Discord.MessageButton() // Next
      .setCustomId('last')
      .setLabel('Last')
      .setStyle('SECONDARY');
    const row = new Discord.MessageActionRow()
      .addComponents(
        firstbutton,
        nextbutton,
        backbutton,
        lastbutton
      )
    const generateEmbed = start => {

      content = pagestrings[start].join('\n')
      return content
    }
    let msg = await message.channel.send({
      content: generateEmbed(0),
      components: [row]
    })
    const filter = i => (i.customId === 'next' || i.customId === 'back' || i.customId === 'first' || i.customId === 'last') && i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({
      filter,
      time: 600000
    });





    let currentIndex = 0
    collector.on('collect', async i => {

      if (i.customId === 'back') {
        if (currentIndex !== 0) {
          currentIndex -= 1
        }
      } else if (i.customId === 'next') {
        if (currentIndex !== (pagestrings.length - 1)) {
          currentIndex += 1
        }

      } else if (i.customId === 'first') {
        currentIndex = 0
      } else if (i.customId === 'last') {
        currentIndex = (pagestrings.length - 1)
        console.log((pagestrings.length - 1))
      }
      if (i) {
        await i.update({
          content: generateEmbed(currentIndex),
          components: [row]
        })
      }

    })




  }
};