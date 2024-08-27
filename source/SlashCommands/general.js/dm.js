const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("dm A Member")
    .addUserOption(option => option.setName('member').setDescription('The member').setRequired(true))
    .addStringOption(option => option.setName('message').setDescription('Leave A Message ().').setRequired(true)),

    run : async (client, interaction, args) => {
          
if (interaction.member.id !== "717858852204183592") return interaction.reply({content: `:x:** This Command Requires \`<NOOOO:)_)_#$#_$)#_%^)(@$)*>\`.**`, ephemeral: true})

let mod = interaction.options.getUser("member");
let message = interaction.options.getString("message");

  interaction.reply({content: `Done Sent`, ephemeral: true});

            const msg = await mod.send({
                content: message
            }).catch(e => {
                interaction.reply({content: `Couldn't send A DM .. Member Dms Are Closed`})
            })
        
                 }
}