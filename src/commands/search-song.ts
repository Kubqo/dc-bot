import search from 'youtube-search'
import * as youtubeSearch from "youtube-search";
import { playSong } from './play-song';
import DiscordJS from 'discord.js'
import { AudioPlayer } from '@discordjs/voice'
import dotenv from 'dotenv'

dotenv.config()

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 5,
  key: process.env.API_KEY
};

export const searchSong = async (args: string[], message: DiscordJS.Message, player: AudioPlayer) => {
  search(args.join(' '), opts, function (err, results) {
    if (err) return console.log(err);
    console.dir(results);
    playSong(results![0].link, message, player)
  });
}

