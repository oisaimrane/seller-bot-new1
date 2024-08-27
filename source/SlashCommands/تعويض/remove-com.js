const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js')

const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-com")
        .setDescription("ازالة كود من التعويضات")
        .addStringOption(option => option.setName("code").setRequired(true).setDescription("الكود")),

        
        run : async (client, interaction, args) => {	if(!interaction.member.roles.cache.has("982031115638427699")) return interaction.reply({content: `Missing role Permissions` , ephemeral:true})
            let code = interaction.options.getString("code")
            let codeData = await db.get(`code_${code}`)
            if(!codeData) return interaction.reply({content: "الكود غير صحيح او ليس موجود"  , ephemeral: true})
            let user = codeData.userID
            let userdb = await db.get(`users_${user}`)
            if(!userdb) return interaction.reply({content: "يرجى التواصل مع الادمن .الشخص غير موجود في التعويضات" , ehpemeral: true})
            let codeUser = userdb.codes.find(x => x.code === code)
            if(!codeUser) return interaction.reply({content: "الكود غير صحيح" , ephemeral: true})
            userdb.codes.splice(userdb.codes.indexOf(codeUser), 1)
            await db.set(`users_${user}`, userdb)
            await db.delete(`code_${code}`)


        
            let embed = new MessageEmbed()
            .setTitle("Successful")
            .setDescription(`تم حذف الكود بنجاح`)
            .setColor("RED")
            await interaction.reply({embeds: [embed]})


            let logID = "996442207164846091"
            let log = await client.channels.cache.get(logID)
            let logEmbed = new MessageEmbed()
            .setTitle("حذف كود")
            .setDescription(`تم حذف كود ${code} من التعويضات`)
            .addFields({
                name: "الشخص ID",
                value: `${codeData.userID}`,

            } , {
                name: `الإداري`,
                value: `${interaction.member} | ${interaction.member.id}`,
            } , {
                name: "الكود",
                value: `${code}`,
            } , {
                name: "النوع والكمية",
                value: `${codeData.type} | ${codeData.amount}`,
            } )
            .setColor('RED')
            await log.send({embeds :[logEmbed]})




         
        }

};



		

