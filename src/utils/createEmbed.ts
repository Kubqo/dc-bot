import DiscordJS, { MessageEmbed } from "discord.js";

export const embedSong = (video: any, message: DiscordJS.Message) => {
  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(video.title)
    .setURL(video.link)
    // .setAuthor(video.channelTitle, response.authorThumbnails[0].url, response.authorUrl)
    .setDescription(video.description)
    // .setThumbnail(avatar!)
    .setImage(video.thumbnails.high.url)
}
