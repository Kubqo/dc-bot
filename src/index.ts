import DiscordJS, { Intents, Interaction } from 'discord.js'
import dotenv from 'dotenv'
import { add, ping, play } from './slash-commands'
import { joinVoiceChannel } from '@discordjs/voice'

dotenv.config()

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
})

client.on('ready', () => {
  console.log('The bot is ready')

  const guildId = '895352675804278784';
  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  commands?.create(ping)
  commands?.create(add)
  commands?.create(play)
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }
  const { commandName, options } = interaction

  if (commandName === 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true, // this means that only you will see reply 
    })
  }

  if (commandName === 'add') {
    const num1 = options.getNumber('num1')!
    const num2 = options.getNumber('num2')!

    interaction.reply({
      content: `The sum is ${num1 + num2}`,
      ephemeral: true, // this means that only you will see reply 
    })
  }

  if (commandName === 'play') {
    const url = options.getString('url')!
    console.log(url)
    interaction.reply({
      content: `playing`,
      ephemeral: true, // this means that only you will see reply 
    })
  }
})

client.login(process.env.BOT_TOKEN)