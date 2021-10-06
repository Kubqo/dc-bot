import DiscordJS from 'discord.js'

export const add = {
  name: 'add',
  description: 'adds two numbers',
  options: [{
    name: 'num1',
    description: 'The first number',
    required: true,
    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
  },
  {
    name: 'num2',
    description: 'The second number',
    required: true,
    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
  }]
}

export const ping = {
  name: 'ping',
  description: 'Replies with pong.',
}

export const play = {
  name: 'play',
  description: 'Play music from ytbe',
  options: [{
    name: 'url',
    description: 'ytbe link',
    required: true,
    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
  }]
}