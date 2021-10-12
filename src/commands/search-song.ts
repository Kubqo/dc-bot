import search from 'youtube-search'
import * as youtubeSearch from "youtube-search";
import { playSong } from './play-song';
import DiscordJS from 'discord.js'
import dotenv from 'dotenv'
import { embedSong } from '../utils/createEmbed';
import { AudioManager } from 'discordaudio';

dotenv.config()

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 5,
  key: process.env.API_KEY
};

export const searchSong = async (
  args: string[],
  message: DiscordJS.Message,
  connections: Map<any, any>,
  audioManager: AudioManager) => {
  search(args.join(' '), opts, function (err, results) {
    if (err) return console.log(err);

    const voiceChannel = message.member?.voice.channel;
    if (voiceChannel) {
      const embed = embedSong(results![0], message);
      message.channel.send({ embeds: [embed] });
    }

    playSong(results![0].link, message, connections, audioManager)
  });
}

