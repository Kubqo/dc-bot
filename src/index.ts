import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice'

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
    // get link by shifting arguments
    const url = args.shift();
    // check if link was provided
    if (!url) {
      message.channel.send('Link was not provided')
      return
    }

    // create voiceChannel 
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
      const resource = createAudioResource('./test-mp3/letsgo.mp3');

      // subscribe to player to be able to listen to song, play song
      connection?.subscribe(player);
      player.play(resource);
      message.channel.send(`Playing: ${url}`)

    } else {
      message.reply('Join a voice channel then try again!');
    }
  }
})

client.login(process.env.BOT_TOKEN)