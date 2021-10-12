import DiscordJS, { VoiceChannel } from 'discord.js'
import { AudioManager } from 'discordaudio';

export const queue = (
  vc: any,
  message: DiscordJS.Message,
  audioManager: AudioManager) => {

  if (!vc) message.channel.send({ content: `There is currently nothing playing!` });
  const queue = audioManager.queue(vc).reduce((text: string[], song, index) => {
    if (song.title) text.push(`**[${index + 1}]** ${song.title}`);
    else text.push(`**[${index + 1}]** ${song.url}`);
    return text;
  }, []);
  const queueEmbed = new DiscordJS.MessageEmbed()
    .setColor(`BLURPLE`)
    .setTitle(`Queue`)
    .setDescription(queue.join('\n'));
  message.channel.send({ embeds: [queueEmbed] });
}

