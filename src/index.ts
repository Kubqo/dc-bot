import DiscordJS, { Intents, VoiceChannel } from 'discord.js'
import dotenv from 'dotenv'
import { playSong } from './commands/play-song';
import { stopSong } from './commands/stop-song';
import { searchSong } from './commands/search-song';
import { AudioManager } from 'discordaudio';
import { skipSong } from './commands/skip-song';
import { queue } from './commands/queue';
import { help } from './commands/help';

dotenv.config()

// setup client for connecting to discord
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]
})

const config = {
  prefix: '-'
};

const connections = new Map();
const audioManager = new AudioManager();

client.on('ready', () => {
  console.log('The bot is ready')
  console.log('Logged on servers:')
  client.guilds.cache.forEach(guild => console.log(guild.name));
  console.log(`Total server: ${client.guilds.cache.size}`)
})

// commands
client.on('messageCreate', message => {

  if (message.author.bot || message.channel.type === `DM`) return;
  if (!message.content.startsWith(config.prefix)) return;

  let args = message.content.substring(config.prefix.length).split(" ");
  const vc = connections.get(message.guild?.me?.voice.channel?.id);

  switch (args[0].toLowerCase()) {
    case 'play':
      playSong(args[1], message, connections, audioManager)
      break;
    case 'skip':
      skipSong(vc, message, audioManager)
      break;
    case 'stop':
      stopSong(vc, message, audioManager)
      break;
    case 'queue':
      queue(vc, message, audioManager)
      break;
    case 'search':
      searchSong(args, message, connections, audioManager)
      break;
    case 'help':
      help(message)
      break;
  }
})

client.login(process.env.BOT_TOKEN)