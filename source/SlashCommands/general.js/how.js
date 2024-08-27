const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("how")
    .setDescription("How To Buy❓"),
    run : async (client, interaction, args) => {
        await interaction.reply({content: `https://cdn.discordapp.com/attachments/963138595873513482/1000367647613014077/2022-07-23_13-19-18_1.mp4`})
    }
  
}