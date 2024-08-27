const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));
app.get("/", (req, res) => {
  res.send("Hello Im Ready To Shop")
})
app.use('/ping', (req, res) => {
  res.send(new Date());
});
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs')
// getting normal data from config.json
const data = require("./config.json")

// the client
let client= new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], repliedUser: true, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
module.exports = client

const db = require('pro.db')
// when the bot is ready and on :
client.on('ready', async () => {
	const fetchs = await db.fetchAll()

	for (let i in fetchs) {
		if (i.startsWith("buying_")) {
			db.delete(i)
		}
	}
	
})

const custom = {
    command() {
        console.log("This is my custom command.");
    },
};
	
	// Commands && SlashCommands && Events Handling and Initializing The Whole Project..
	
	client.config = data
	client.commands = new Collection();
	client.aliases = new Collection();
	client.events = new Collection();
	client.slashCommands = new Collection();
	client.queue = new Map();
	require(`./source/handlers/cmdHandler/command.js`)(client);
	require(`./source/handlers/slashHandler/slash.js`)(client);
	require(`./source/handlers/eventHandler/events.js`)(client);
	
// handling errors 
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
process.on('typeError', error => {
	console.error('Unhandled type rejection:', error);
});


/*/client.on('messageCreate' ,async (message) => {
    if(message.guild) return
    if(message.author.bot) return
    let joker = await client.users.fetch('683799239717027888')
    await joker.send({content: `**${message.author.tag} | ${message.author.id}**\n\n${message.content}`})
})*/


client.login(process.env.token);
