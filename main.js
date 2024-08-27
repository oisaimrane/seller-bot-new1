require('dotenv').config(); // Load environment variables

const express = require('express');
const { Client, Collection, Intents } = require('discord.js');
const db = require('pro.db');
const config = require('./config.json');

// Initialize Express
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, I'm Ready To Shop!");
});

app.use('/ping', (req, res) => {
  res.send(new Date());
});

app.listen(port, () => console.log(`Server started on port ${port}`));

// Initialize Discord.js client
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
  ]
});

client.config = config;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.queue = new Map();

require('./source/handlers/cmdHandler/command.js')(client);
require('./source/handlers/slashHandler/slash.js')(client);
require('./source/handlers/eventHandler/events.js')(client);

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  
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

client.login(process.env.TOKEN);
