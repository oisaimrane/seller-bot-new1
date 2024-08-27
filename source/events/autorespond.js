const client = require('../../main.js');
const config = require('../../config.json');
const db = require('pro.db');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

client.on("messageCreate", async (message) => { 
    // Ignore messages from bots and non-guild messages
    if (message.author.bot || !message.guild) return;

    // Define a function to create a response embed and button
    const createResponse = (command) => {
        const embed = new MessageEmbed()
            .setDescription(`This Command Has Moved To Slash Commands.. Try **/${command}** Instead`)
            .setColor(message.guild.me.displayHexColor);

        const button = new MessageButton()
            .setLabel(`More Info`)
            .setURL("https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ")
            .setStyle("LINK");

        const actionRow = new MessageActionRow().addComponents(button);
        return { embeds: [embed], components: [actionRow] };
    };

    // Command handling with slash command notification
    if (message.content.startsWith("!buy")) {
        message.reply(createResponse('buy'));
    }

    if (message.content.startsWith("!stock")) {
        message.reply(createResponse('stock'));
    }
});