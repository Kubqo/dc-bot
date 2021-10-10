import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import { createAudioPlayer, AudioPlayerStatus, getVoiceConnection } from '@discordjs/voice'
import { playSong } from './commands/play-song';
import { stopSong } from './commands/stop-song';
import { searchSong } from './commands/search-song';


dotenv.config()
const prefix = '!'
const player = createAudioPlayer();

// setup client for connecting to discord
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]
})

client.on('ready', () => {
  console.log('The bot is ready')
})

player.on(AudioPlayerStatus.Playing, () => {
  console.log('The audio player has started playing!');
});

// commands
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // all arguments of message
  const args = message.content.slice(prefix.length).split(/ +/);
  // get first argument of mesage
  const command = args.shift()?.toLocaleLowerCase();

  if (command === 'play') {
    const url = args.shift();
    playSong(url!, message, player);
  }
  if (command === 'stop') {
    stopSong(message, player)
  }
  if (command === 'search') {
    searchSong(args, message, player) 
  }
})

client.login(process.env.BOT_TOKEN)