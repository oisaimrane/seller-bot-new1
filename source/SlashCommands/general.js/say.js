const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("say something")
        .addStringOption(option => option.setName('text').setDescription('The text to say').setRequired(true))
  .addChannelOption(o => o.setName('channel').setDescription('CHANNANEL')),
        run : async (client, interaction, args) => {    if(!interaction.member.permissions.has("ADMINISTRATOR")) return;
            const text = interaction.options.getString('text');
                  if(text.includes("everyone") && interaction.member.id !== "683799239717027888") return interaction.reply({content: `FUFUFUFUFUCKCKCKKCCK YOUU DON"T MENTIOTJTONME METNION EVERYPNE`})
          const channel = interaction.options.getChannel('channel') || interaction.channel
            await interaction.reply({content:` fufufufuf` , ephemeral: true})
            await channel.send({content: text})
        }

};