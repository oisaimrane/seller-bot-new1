const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed ,  MessageButton} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow} = require('discord.js');
const Discord = require('discord.js')

const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("com")
        .setDescription("معرفة معلومات عن الكود في التعويضات")
        .addStringOption(option => option.setName("الكود").setRequired(true).setDescription("قم بإدخال الكود الذي تريد معرفة معلومات عنه")),
        run : async (client, interaction, args) => {
					if(!interaction.member.roles.cache.has("982031115638427699")) return interaction.reply({content: `Missing role Permissions` , ephemeral:true})
            let code = interaction.options.getString("الكود")
            let codeData = await db.get(`code_${code}`)
            if(!codeData) return interaction.reply({content: "الكود غير صحيح او ليس موجود" , ephemeral: true})
            let user = codeData.userID

           
            let embed = new MessageEmbed()
            .setTitle("معلومات الكود")
            .setDescription(`الكود : ${code}`)
            .setColor("YELLOW")
            .addFields({
                name: "الشخص ID",
                value: `${codeData.userID}`,
            } , {
                name: `تم اضافته في`,
                value: `<t:${codeData.date}:F>`,
            } , {
                name: "النوع والكمية",
                value: `${codeData.type} | ${codeData.amount}`,
            } )
        
          


            await interaction.reply({embeds: [embed]})

        
        }

};



		

