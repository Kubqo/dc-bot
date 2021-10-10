import DiscordJS from 'discord.js'
import { joinVoiceChannel, createAudioResource, AudioPlayer, DiscordGatewayAdapterCreator } from '@discordjs/voice'
import ytdl from 'ytdl-core';
import fs from 'fs'

export const playSong = async (url: string, message: DiscordJS.Message, player: AudioPlayer) => {
  // check if link was provided
  if (!url || !ytdl.validateURL(url)) {
    message.channel.send(url ? 'Link was not provided' : 'Incorrect url!')
    return
  }

  const voiceChannel = message.member?.voice.channel;

  // check if user is in voice channel
  if (voiceChannel) {
    // download mp3
    message.reply(`Searching for ${url}`)
    console.log(`Searching for ${url}`)
    await downloadAudio(url)
    console.log('Successfully downloaded!');

    //create connection to voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
      selfDeaf: false,
    });

    // create audio resurce playable by discord bot
    const resource = createAudioResource('file.mp3');
    player.play(resource)
    // subscribe to player to be able to listen to song, play song
    connection?.subscribe(player);
    // player.play(resource);
    message.channel.send(`Playing your music`)
  } else {
    message.reply('Join a voice channel then try again!');
  }
}

const downloadAudio = async (link: string) => {
  const output_audio = 'file.mp3';
  let starttime = 0;
  return new Promise(function (resolve, reject) {
    const start = () => {
      const stream = ytdl(link, {
        filter: "audioonly",
      });

      stream.pipe(fs.createWriteStream(output_audio));

      stream.once("response", () => {
        starttime = Date.now();
      });

      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloaded_minutes = (Date.now() - starttime) / 1000 / 60;
        const estimated_download_time = downloaded_minutes / percent - downloaded_minutes;

        console.log(`downloaded ${downloaded}/${total}`)

        if (estimated_download_time.toFixed(2) >= '0.5') {
          console.warn("Restarting the download...");
          stream.destroy();
          start();
        }
      });

      stream.on("end", () => {
        resolve(output_audio);
      });

      stream.on("error", (error) => {
        console.log(error);
        stream.destroy();
        downloadAudio(link);
        return

      });
    };
    start();
  });
};