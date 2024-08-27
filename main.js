const express = require("express");
const app = express();
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const db = require('pro.db');
const data = require("./config.json");

// Express server setup
app.get("/", (req, res) => {
  res.send("Hello I'm Ready To Shop");
});

app.use('/ping', (req, res) => {
  res.send(new Date());
});

const port = 3000; // Set the port for your Express server
app.listen(port, () => console.log(`Server started on port ${port}`));

// Discord.js client setup
let client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

client.config = data;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.queue = new Map();

require(`./source/handlers/cmdHandler/command.js`)(client);
require(`./source/handlers/slashHandler/slash.js`)(client);
require(`./source/handlers/eventHandler/events.js`)(client);

client.on('ready', async () => {
  const fetchs = await db.fetchAll();

  for (let i in fetchs) {
    if (i.startsWith("buying_")) {
      await db.delete(i);
    }
  }
});

// Error handling
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
});

// client.on('messageCreate', async (message) => {
//   if (message.guild) return;
//   if (message.author.bot) return;
//   let joker = await client.users.fetch('683799239717027888');
//   await joker.send({ content: `**${message.author.tag} | ${message.author.id}**\n\n${message.content}` });
// });

client.login(process.env.token);
