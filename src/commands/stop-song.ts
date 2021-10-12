import DiscordJS from 'discord.js'
import { AudioManager } from 'discordaudio';


export const stopSong = (vc: any, message: DiscordJS.Message, audioManager: AudioManager) => {
  if (!vc) {
    message.channel.send({ content: `There is currently nothing playing!` });
    return;
  }
  audioManager.stop(vc);
  message.channel.send({ content: `Player successfully stopped!` });
}
