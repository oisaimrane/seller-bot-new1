const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("set-avatar")
    .setDescription("Change Your Bot Avatar")
    .addStringOption(option => option.setName("avatar-link").setRequired(true).setDescription("The New Avatar Link")),
    run : async (client, interaction, args) => {	
        let newAvatar = interaction.options.getString("avatar-link");
        if(client.config.ownerID !== interaction.member.id) return interaction.reply({content: `:x:**You Are Not The Bot Owner.**`, ephemeral: true});

        let confirm =  new MessageButton()
        .setCustomId("change")
        .setLabel('🚀 Confirm')
        .setStyle('SUCCESS')
        .setDisabled(false)
        let cancel = new MessageButton()
        .setCustomId("cancel")
        .setLabel('❌ Cancel')
        .setStyle('DANGER')
        .setDisabled(false)
        const row = new MessageActionRow()
        .addComponents(
            confirm,cancel
           
        )
   

        const embed = new MessageEmbed()
        .setTitle(`**Changing Avatar**`)
        .setDescription('Are You Sure You Wanna Change Your Bot Avatar ?')
        .setColor('#0099ff')
        .addField('**New Avatar Link**', `${newAvatar}`)


  const msg =   await interaction.reply({embeds: [embed] , components: [row] , fetchReply: true});
    const filter = i => i.user.id === interaction.member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
    collector.on('collect', async i => {
        await i.deferUpdate();
        if (i.customId === 'change') {
            try {
                await client.user.setAvatar(`${newAvatar}`);
                await interaction.editReply({content: `*Avatar Changed Successfully \n New Avatar Link Is: ${newAvatar} *` , embeds: [] , components: []});

            } catch (error) {
                await interaction.editReply({content: `:x:** Error: ${error} **`, embeds: [] , components: []});
                
            }
        } else if (i.customId === 'cancel') {
            await interaction.editReply({content: '*Operation Cancelled*' ,embeds: [] , components: []});
        }
    })

    collector.on('end', async (collected, reason) => {
        if (reason === 'time' && collected.size === 0) {
            await interaction.editReply({content: '*Operation TimedOut*' ,embeds: [] , components: []});
        }
    })


          


   



    }
}