import DiscordJS from 'discord.js'
import { joinVoiceChannel, createAudioResource, AudioPlayer, DiscordGatewayAdapterCreator } from '@discordjs/voice'
import ytdl from 'ytdl-core';
import fs from 'fs'
const cliProgress = require('cli-progress');

export const playSong = async (url: string, message: DiscordJS.Message, player: AudioPlayer) => {
  // check if link was provided
  if (!url || !ytdl.validateURL(url)) {
    message.channel.send(url ? 'Link was not provided' : 'Incorrect url!')
    return
  }
  const fileName = `file-${message.guildId!}.mp3`
  const voiceChannel = message.member?.voice.channel;

  // check if user is in voice channel
  if (voiceChannel) {
    // download mp3
    console.log(`Searching for ${url}`)
    await downloadAudio(url, fileName)
    console.log('Successfully downloaded!');

    //create connection to voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
      selfDeaf: false,
    });

    // create audio resurce playable by discord bot
    const resource = createAudioResource(fileName);
    player.play(resource)
    // subscribe to player to be able to listen to song, play song
    connection?.subscribe(player);
    // player.play(resource);
    console.log('Playing!');
    message.channel.send(`Playing now!`)
  } else {
    message.reply('Join a voice channel then try again!');
    console.log('Join a voice channel then try again!')
  }
}

const downloadAudio = async (link: string, fileName: string) => {
  const output_audio = fileName;
  let starttime = 0;
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  return new Promise(function (resolve, reject) {
    const start = () => {
      const stream = ytdl(link, {
        filter: "audioonly",
      });
      
      let started = false

      stream.pipe(fs.createWriteStream(output_audio));

      stream.once("response", () => {
        starttime = Date.now();
      });

      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloaded_minutes = (Date.now() - starttime) / 1000 / 60;
        const estimated_download_time = downloaded_minutes / percent - downloaded_minutes;

        if (!started) {
          bar1.start(total, 0);
          started = true
        }

        bar1.update(downloaded);
        
        if (estimated_download_time.toFixed(2) >= '0.5') {
          bar1.stop();
          console.warn("Restarting the download...");
          stream.destroy();
          start();
        }
      });

      stream.on("end", () => {
        bar1.stop();
        resolve(output_audio);
      });

      stream.on("error", (error) => {
        bar1.stop();
        console.log(error);
        stream.destroy();
        downloadAudio(link, fileName);
        return

      });
    };
    start();
  });
};