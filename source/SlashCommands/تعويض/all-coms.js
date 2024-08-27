const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed ,  MessageButton} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow} = require('discord.js');
const Discord = require('discord.js')

const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("all-coms")
        .setDescription("معرفة كل الاكواد الموجودة في التعويضات")
        .addUserOption(option => option.setName("الشخص").setRequired(false).setDescription("ايجاد تعويضات الشخص")),

        
        run : async (client, interaction, args) => {
					if(!interaction.member.roles.cache.has("982031115638427699")) return interaction.reply({content: `Missing role Permissions` , ephemeral:true})
            let user = interaction.options.getUser("الشخص")
            let comsArray = []
            if(!user) {
                let coms = await db.fetchAll()
                for(let com in coms) {
                    if(com.startsWith("code_")) {
                        let codeData = await db.get(com)
                        comsArray.push(codeData)
                    }
                }
            } else {
                
                let userdb = await db.get(`users_${user.id}`)
                if(!userdb) return interaction.reply({content: "الشخص غير موجود في التعويضات" , ephemeral: true})
                for(let code in userdb.codes) {
                    comsArray.push(code)
                }

            }
            let nextButton = new MessageButton()
            .setLabel(`➡️`)
            .setStyle("PRIMARY")
            .setCustomId("next")
            .setDisabled(false)
            let prevButton = new MessageButton()
            .setLabel(`⬅️`)
            .setStyle("PRIMARY")
            .setCustomId("prev")
            .setDisabled(true)
                                let row = new MessageActionRow()
            .addComponents(prevButton, nextButton)
            let totalPages = Math.ceil(comsArray.length / 4) || 1
            let page = 0
            let mapped = comsArray.slice(page * 4 , page * 4 +4).map((com, i) => {
                return `${page * 4 + i + 1}- Code: **${com.code}** \nRedemmer ID: **${com.userID}** \n Type: **${com.type}** - Amount: **${com.amount}** \n Date: <t:${com.date}:F> \n `
            }) || `لا يوجد تعويضات`
            let embed = new MessageEmbed()
            .setTitle("الاكواد الموجودة في التعويضات")
            .setDescription(mapped.join("\n"))
        
            .setFooter({text:`الصفحة ${page + 1} من ${totalPages}`})
            .setColor("YELLOW")
            if(comsArray.length < 1) embed.setDescription("لا يوجد تعويضات")
            if(totalPages <= 1) {
                nextButton.setDisabled(true)
                prevButton.setDisabled(true)
            }
         const msg =    await interaction.reply({embeds: [embed] , components: [row] , fetchReply: true})
         if(totalPages <= 1) return;
         const filter = i => i.user.id === interaction.member.id
                   const collector = msg.createMessageComponentCollector({filter , time: 180000})
       
                            collector.on("collect" , async i => {
                       await i.deferUpdate() 
                       if(i.customId === "next") {
                           if(page === totalPages - 1) {
                               nextButton.setDisabled(true)
                               prevButton.setDisabled(false)
                               
                           } else {
                               nextButton.setDisabled(false)
                               prevButton.setDisabled(false)
                               page++
                               if(page === totalPages - 1) {
                                   nextButton.setDisabled(true)
                                   prevButton.setDisabled(false)
                               }
                           
                           }
                                   let mapped = comsArray.slice(page * 4 , page * 4 +4).map((com, i) => {
                return `${page * 4 + i + 1}- Code: **${com.code}** \nRedemmer ID: **${com.userID}** \n Type: **${com.type}** - Amount: **${com.amount}** \n Date: <t:${com.date}:F> \n `
            })
                           embed.setDescription(mapped.join("\n"))
                           .setFooter({text:`الصفحة ${page + 1} من ${totalPages}`})
       
                           await i.editReply({embeds: [embed] , components: [row], fetchReply: true })
       
       
                       } else if (i.customId === "prev") {
                           if(page === 0) {
                               prevButton.setDisabled(true)
                           } else {
                               page--
                               if(page < totalPages -1) {
                                   nextButton.setDisabled(false)
                               }
                               if(page === 0) {
                                   prevButton.setDisabled(true)
               
                               }
                           }
                           
                           let mapped = comsArray.slice(page * 4 , page * 4 +4).map((com, i) => {
                            return `${page * 4 + i + 1}- Code: **${com.code}** \nRedemmer ID: **${com.userID}** \n Type: **${com.type}** - Amount: **${com.amount}** \n Date: <t:${com.date}:F> \n `
                        })
                           embed.setDescription(mapped.join("\n"))
                           .setFooter({text:`الصفحة ${page + 1} من ${totalPages}`})
       
                           await i.editReply({embeds: [embed] , components: [row], fetchReply: true })
                       }
       
                   })
       
       
               
              

        
        }

};



		

