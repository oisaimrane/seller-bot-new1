const { Client, CommandInteraction } = require("discord.js");
const {  Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("PONG"),
        run : async (client, interaction, args) => {	
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("1")
					.setLabel(`PONG!`)
					.setStyle('SUCCESS')
					.setDisabled(true)
					.setEmoji("😉")
			);
   let circles = {
      supa: "🤯",
      zap: "⚡",
      green: "🟢",
      yellow: "🟡",
      red: "🔴",
      ew: "💢"
  }

 let ping = client.ws.ping

    let embed = new Discord.MessageEmbed()
        .setTitle('🏓 Pong!')
        .setDescription(`${ping <= 20 ? circles.supa : ping <= 40 ? circles.zap : ping <= 150 ? circles.green : ping <= 300 ? circles.yellow : ping <= 750 ? circles.red : cirles.ew} | ${ping} ms`)
        .setColor('YELLOW')
        .setThumbnail("https://media.discordapp.net/attachments/866865312112967710/877406174658576404/11d800c7b4c405d96e8e412163727a89.png")
        .setFooter({text :
            `Status: ${ping <= 20 ? "Extremely good" : ping <= 40 ? "Very good" : ping <= 150 ? "good" : ping <= 300 ? "bad" : ping <= 750 ? "very bad" : "Extremely bad"}!`, iconURL:
            interaction.user.displayAvatarURL({ dynamic: true })
        });
			interaction.reply({ embeds: [embed] , components: [row] , ephemeral: true})
	
        }

};



		

