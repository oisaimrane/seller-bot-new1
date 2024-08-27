const express = require("express");
const app = express();
const keep_alive = require('./keep_alive.js');
const { Client, Collection, Intents } = require('discord.js');
const db = require('pro.db');
const fs = require('fs');
const data = require("./config.json"); // Getting normal data from config.json

// Create the Discord client
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

// Export the client for use in other files
module.exports = client;

// Start the Express server
app.listen(3000, () => console.log("Server started on port 3000")); // Specify the port
app.get("/", (req, res) => {
    res.send("Hello I'm Ready To Shop");
});
app.use('/ping', (req, res) => {
    res.send(new Date());
});

// When the bot is ready
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const fetchs = await db.fetchAll();

    for (let i in fetchs) {
        if (i.startsWith("buying_")) {
            await db.delete(i);
        }
    }
});

// Initialize collections for commands and events
client.config = data;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.queue = new Map();

// Load command handler
require('./source/handlers/cmdHandler')(client); // Pass client to the command handler

// Log in to Discord
client.login(data.token); // Ensure you have your bot token in config.json 