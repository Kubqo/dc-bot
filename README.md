# DISCORD MUSIC BOT

Recently i have decided to make own discord bot, so here it is...
It is made with typescript and node package [discord js](https://discord.js.org/#/).
I have also provided Dockerfile if u are interested in hosting your aplication in a container.
You just need to create your own bot at [discord for developers](https://discord.com/developers/docs/intro) and get youtube api key v3 at [Youtube api key documentation](https://developers.google.com/youtube/v3/getting-started) and save them in .env file:

```
BOT_TOKEN=Your_Token
API_KEY=Your_api_key
```

To create container use command: <br>
```
docker build -t discord-bot .
```

