import DiscordJS from 'discord.js'

export const help = (message: DiscordJS.Message) => {

  const queueEmbed = new DiscordJS.MessageEmbed()
    .setColor(`BLURPLE`)
    .setTitle(`Help`)
    .setDescription(
      `
      -play {link of youtube song/video}
      -search {name of video you want to play}
      -queue
      -skip
      -stop
      -help
      `
    );
  message.channel.send({ embeds: [queueEmbed] });
}

