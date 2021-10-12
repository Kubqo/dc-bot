import DiscordJS from 'discord.js'
import { AudioManager } from 'discordaudio';


export const skipSong = (vc: any, message: DiscordJS.Message, audioManager: AudioManager) => {
  if (!vc) {
    message.channel.send({ content: `There is currently nothing playing!` });
    return;
  }
  audioManager.skip(vc).then(() => message.channel.send({ content: `Successfully skipped the song!` })).catch((err: string) => {
    console.log(err);
    message.channel.send({ content: `There was an error while skipping the song!` });
  });
}
