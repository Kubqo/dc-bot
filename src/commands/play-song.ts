import DiscordJS, { VoiceChannel } from 'discord.js'
import { AudioManager } from 'discordaudio';

export const playSong = (
  url: string,
  message: DiscordJS.Message,
  connections: Map<any, any>,
  audioManager: AudioManager) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!message.member?.voice.channel && !message.guild?.me?.voice.channel) {
    message.channel.send({ content: `Please join a voice channel in order to play a song!` });
    return
  }

  if (!url) {
    message.channel.send({ content: `Please provide a song` });
    return
  }

  const uvc = (message.member?.voice.channel || message.guild?.me?.voice.channel) as VoiceChannel;
  audioManager.play(uvc, url, {
    quality: 'high',
    audiotype: 'arbitrary',
    volume: 10
  }).then(queue => {
    connections.set(uvc.id, uvc);
    if (queue === false) message.channel.send({ content: `Your song is now playing!` });
    else message.channel.send({ content: `Your song has been added to the queue!` });
  }).catch(err => {
    console.log(err);
    message.channel.send({ content: `There was an error while trying to connect to the voice channel!` });
  });
}

