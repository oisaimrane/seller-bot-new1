const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed ,  MessageButton} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow} = require('discord.js');
const Discord = require('discord.js')

const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("use-code")
        .setDescription("للتعويض")
        .addStringOption(option => option.setName("الكود").setRequired(true).setDescription("قم بإدخال الكود الخاص بك")),
        run : async (client, interaction, args) => {
            let code = interaction.options.getString("الكود")
            let codeData = await db.get(`code_${code}`)
            if(!codeData) return interaction.reply({content: "الكود غير صحيح او ليس موجود" , ephemeral: true})
            let user = codeData.userID
					if(user !== interaction.member.id) return interaction.reply({content:`It's Not Your Code` , ephemeral:true})

					let type = codeData.type.toLowerCase();
					let amount = codeData.amount

					let data = await db.get(`accounts_${interaction.guild.id}_${client.user.id}`)
					if(!data) return;
					let AccType = await data.find(x => x.name === type)
					if(!AccType) return;
					if(AccType.emails.length < amount) return interaction.reply({content: `The Amount Of Current ${type.toUpperCase} Stock Is Less Than Your Code`})
						let tempMails = AccType.emails
					  const accs = AccType.emails.splice(0, amount)
          data[data.indexOf(AccType)].emails = AccType.emails;
            await db.set(`accounts_${interaction.guild.id}_${client.user.id}`, data)

					            let button = new MessageButton()
            .setLabel("For Phones")
            .setCustomId('acc')
            .setDisabled(false)
            .setStyle("SUCCESS")
            .setEmoji("📱")
            
            let phone = new MessageActionRow() 
  .addComponents(
      button
  )  
  const collectedMessage = await interaction.member.send({
    embeds: [new MessageEmbed()


      .setDescription(`**Hi** ${interaction.member.user.tag}, :shopping_cart: \`|\` **You Have Redemeed Account${amount > 1 ? "s" : ""}**
\`\`\`
${accs.join("\n")}
\`\`\`

> **Account type:** ${type.toUpperCase()}
> **Amount of account${amount > 1 ? "s" : ""}:** \`${amount}\`
> **Redeem date:** <t:${Math.round(Date.now()  /1000)}:F>
`)
    .setColor("GREEN")
    ] , components: [phone]
  }).catch(async err => {
   await interaction.reply({content:`Your DM is closed < Couldn't Send The Accounts`})
		
  data[data.indexOf(AccType)].emails = tempMails;
            await db.set(`accounts_${interaction.guild.id}_${client.user.id}`, data)

  })
        
          

	if(collectedMessage) {
		            await interaction.reply({content: `Check Your DM's!`})
		            let userdb = await db.get(`users_${interaction.member.id}`)
            if(!userdb) return interaction.reply({content: "يرجى التواصل مع الادمن .الشخص غير موجود في التعويضات" , ehpemeral: true})
            let codeUser = userdb.codes.find(x => x.code === code)
            userdb.codes.splice(userdb.codes.indexOf(codeUser), 1)
            await db.set(`users_${user}`, userdb)
            await db.delete(`code_${code}`)
		 let log = await db.get(`log_${interaction.guild.id}_${client.user.id}`)
    let logChannel = interaction.guild.channels.cache.get(log)
    if(logChannel && log !== null) {
        let emb = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle("ٌRedemmed Accounts")
                .setDescription(`**:shopping_cart: \`|\` \`${interaction.member.user.tag}\` \`(${interaction.member.id})\` I have Redemmed**`)
        .addFields({
            name: "Accounts",
            value: `||${accs.join("\n")}||`
        } , {
            name: "Category",
            value: `${type.toUpperCase()}`
        } , {
            name: `Amount Of ${amount > 1 ? "Accounts" : "Account"}`,
            value: `${amount} ${amount > 1 ? "Accounts" : "Account"}`
        } , {
            name: "Redeem Date",
            value: `<t:${Math.round(Date.now()  /1000)}:F>`
        })
        ///.setTimestamp()
        logChannel.send({embeds:[emb]})
    }
	}

        
        

}
}



		

