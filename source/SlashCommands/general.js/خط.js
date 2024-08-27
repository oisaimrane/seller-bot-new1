const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageAttachment,MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("خط")
    .setDescription(`اعمل خط`),
    
    run : async (client, interaction, args) => {
	let link = "https://media.discordapp.net/attachments/954661138052816916/977165282256769054/SPOILER_20220520_121242.gif" 
		let file = new MessageAttachment(link , 'خط.gif')
		await interaction.reply({files: [file]})
	
		}
}	
///انت غبي 
///عرص