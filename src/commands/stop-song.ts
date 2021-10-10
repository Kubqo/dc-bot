import DiscordJS from 'discord.js'
import { AudioPlayer, getVoiceConnection } from '@discordjs/voice'

export const stopSong = async (message: DiscordJS.Message, player: AudioPlayer) => {
  const voiceChannel = message.member?.voice.channel;
  const connection = getVoiceConnection(voiceChannel?.guildId!);
  console.log(`status before !stop: ${connection?.state.status}`)
  player.stop();
  connection?.destroy();
  console.log(`status after !stop: ${connection?.state.status}`)
  console.log('Music has stopped')
}
