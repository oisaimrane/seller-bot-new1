const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("add-emoji")
    .setDescription("adds new emoji to a category")
    .addStringOption(option => option.setName("category-name").setRequired(true).setDescription("The Category Name"))
    .addStringOption(option => option.setName("emoji").setRequired(true).setDescription("Emoji")),
    run : async (client, interaction, args) => {	

        let category = interaction.options.getString("category-name").toLowerCase();
let emoji = interaction.options.getString('emoji')



        let data = await db.get(`accounts_${interaction.guild.id}_${client.user.id}`)
        if(!data || data === null) return interaction.reply({content: `:x:** No Categories Found **`, ephemeral: true});
        let check = data.find(x => x.name === category)

        if(check === undefined) return interaction.reply({content: `:x:** Category Not Found **`, ephemeral: true});
        if(client.config.ownerID !== interaction.member.id &&  check.recipent !== interaction.member.id) return interaction.reply({content: `:x:** You are not the owner of this bot || Category. **`, ephemeral: true});
        


	if(emoji.length === 1) {
		        check.emoji = emoji

	} else if(emoji.startsWith("<:")) {
		        check.emoji = emoji

	} else {
		return interaction.reply("invalid emoji")
	}
        db.set(`accounts_${interaction.guild.id}_${client.user.id}`, data);
        await interaction.reply({content: `:white_check_mark:** Emoji Added Successfully **`, ephemeral: true});
     
        let log = await db.get(`log_${interaction.guild.id}_${client.user.id}`)
        let logChannel = interaction.guild.channels.cache.get(log)
        if(!logChannel || log === null) return;
        let embed = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Emoji Added")
        .setDescription(`${interaction.member.user.tag} Added ${emoji}  To ${category}`)
        .setTimestamp()
        logChannel.send({embeds:[embed]})




          


   



    }
}