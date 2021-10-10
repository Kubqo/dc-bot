import DiscordJS from 'discord.js'
import { joinVoiceChannel, createAudioResource, AudioPlayer } from '@discordjs/voice'
import ytdl from 'ytdl-core';
import fs from 'fs'


export const playSong = async (args: string[], message: DiscordJS.Message, player: AudioPlayer) => {
  // get link by shifting arguments
  const url = args.shift();
  // check if link was provided
  if (!url || !ytdl.validateURL(url)) {
    message.channel.send(url ? 'Link was not provided' : 'Incorrect url!')
    return
  }

  message.reply(`Searching for ${url}`)
  await downloadVideo(url)
  console.log('Successfully downloaded!');
  const voiceChannel = message.member?.voice.channel;
  // check if user is in voice channel
  if (voiceChannel) {
    //create connection to voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
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

const downloadVideo = async (link: string) => {
  const output_video = 'file.mp3';
  let starttime = 0;
  return new Promise(function (resolve, reject) {
    const start = () => {
      const stream = ytdl(link, {
        filter: "audioonly",
      });

      stream.pipe(fs.createWriteStream(output_video));

      stream.once("response", () => {
        starttime = Date.now();
      });

      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloaded_minutes = (Date.now() - starttime) / 1000 / 60;
        const estimated_download_time = downloaded_minutes / percent - downloaded_minutes;
        if (estimated_download_time.toFixed(2) >= '1.5') {
          console.warn("Restarting the download...");
          stream.destroy();
          start();
        }
      });

      stream.on("end", () => {
        resolve(output_video);
      });
      
      stream.on("error", (error) => {
        try {
          throw new Error();
        } catch {
          stream.destroy();
          console.log(error);
        }
      });
    };
    start();
  });
};