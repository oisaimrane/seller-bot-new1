const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove-emoji")
    .setDescription("removes emoji to a category")
    .addStringOption(option => option.setName("category-name").setRequired(true).setDescription("The Category Name")),
    
    run : async (client, interaction, args) => {	

        let category = interaction.options.getString("category-name").toLowerCase();



        let data = await db.get(`accounts_${interaction.guild.id}_${client.user.id}`)
        if(!data || data === null) return interaction.reply({content: `:x:** No Categories Found **`, ephemeral: true});
        let check = data.find(x => x.name === category)

        if(check === undefined) return interaction.reply({content: `:x:** Category Not Found **`, ephemeral: true});

			if(check.emoji) {
				check.emoji = null
			} else {
				return interaction.reply({content:`no custom emoji for this category`})
			}

        


	
        db.set(`accounts_${interaction.guild.id}_${client.user.id}`, data);
        await interaction.reply({content: `:white_check_mark:** Emoji Removed Successfully **`, ephemeral: true});
     
        let log = await db.get(`log_${interaction.guild.id}_${client.user.id}`)
        let logChannel = interaction.guild.channels.cache.get(log)
        if(!logChannel || log === null) return;
        let embed = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Emoji Removed")
        .setDescription(`${interaction.member.user.tag} Removed From ${category}`)
        .setTimestamp()
        logChannel.send({embeds:[embed]})




          


   



    }
}