const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js')

const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("تعويض")
        .setDescription("قم بتعويض شخص")
        .addUserOption(option => option.setName("user").setRequired(true).setDescription("الشخص الذي تريد تعويضه"))
        .addStringOption(option => option.setName("type").setRequired(true).setDescription("النوع").addChoices({
            name: "Netflix", value: "Netflix",
        
        } , {
            name: "Spotify", value: "Spotify",
        } , {
            name: "Steam", value: "Steam",
        } , {
            name: "Crunchyroll", value: "Crunchyroll",

        } , {
            name: "Roblox", value: "Roblox",
        } , {
            name: "Deezer", value: "Deezer",
        } , {
            name: "Disney", value: "Disney",
        }))
        .addNumberOption(option => option.setName("amount").setRequired(true).setDescription("الكمية")),
        run : async (client, interaction, args) => {	
					if(!interaction.member.roles.cache.has("982031115638427699")) return interaction.reply({content: `Missing role Permissions` , ephemeral:true})
            let user = interaction.options.getUser("user")
            let type = interaction.options.getString("type")
            let amount = interaction.options.getNumber("amount")
            if(user.id === interaction.member.id) return interaction.reply({content: "لا يمكنك تعويض نفسك" , ephemeral: true})
            if(amount < 1) return interaction.reply({content: "الكمية يجب ان تكون اكبر من 0" , ephemeral: true})
            async function generateCode() {
                // Generate a random string of characters with numbers
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let code = '';
                for (let i = 0; i < 6; i++) {
                    code += chars[Math.floor(Math.random() * chars.length)];
                }
                let codeExists = await db.has(`code_${code}`)
                if(codeExists) return generateCode()
                return code
            }
            let code = await generateCode()
            await db.set(`code_${code}`, {
                code: code,
                userID: user.id,
                type: type,
                amount: amount,
                date: Math.round(Date.now() / 1000),
            })
            let userdb = await db.get(`users_${user.id}`)
            if(!userdb) {
                await db.set(`users_${user.id}`, {
                    userID: user.id,
                    codes: [{
                        
                        code: code,
                        userID: user.id,
                        type: type,
                        amount: amount,
                        date: Math.round(Date.now() / 1000),
                    }], 
      
                })
            } else {
                await userdb.codes.push({
                    code: code,
                    userID: user.id,
                    type: type,
                    amount: amount,
                    date: Math.round(Date.now() / 1000),
                })
                await db.set(`users_${user.id}`, userdb)
            }
            let embed = new MessageEmbed()
            .setTitle("Successful")
            .setDescription(`تم تعويض ${amount} ${type} لـ ${user.tag} \n و قد تم إرسال كود التعويض الى الخاص`)
            .setColor("RANDOM")
            .setTimestamp()
            await interaction.reply({embeds: [embed]})
            await user.send({content: `Your Redeem Code is: **${code}** \n You will get ${amount} ${type} with this code \n You will get the accounts once a moderator responds to your request please be patient`}).catch(err => {
                interaction.channel.send({content: `${user.tag} لم يتم إرسال كود التعويض الى الخاص \n خاصه مقفل!!!!`})
            })


            let logID = "996442207164846091"
            let log = await client.channels.cache.get(logID)
            let logEmbed = new MessageEmbed()
            .setTitle("تعويض")
            .setDescription(`تم تعويض ${amount} ${type} لـ ${user.tag}`)
            .addFields({
                name: "الشخص ID",
                value: `${user.id}`,

            } , {
                name: `الإداري`,
                value: `${interaction.member} | ${interaction.member.id}`,
            } , {
                name: "الكود",
                value: `${code}`,
            } , {
                name: "النوع والكمية",
                value: `${type} | ${amount}`,
            } )
            .setColor('RED')
            await log.send({embeds :[logEmbed]})




         
        }

};



		

