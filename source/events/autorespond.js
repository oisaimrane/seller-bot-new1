const { Client, GatewayIntentBits, Events, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const config = require('./config.json'); // Adjust path if needed

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Slash Command Handling
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'buy') {
        await interaction.reply('This Command Has Moved To Slash Commands.. Try **/buy** Instead');
    } else if (commandName === 'stock') {
        await interaction.reply('This Command Has Moved To Slash Commands.. Try **/stock** Instead');
    }
});

// Message Command Handling (Deprecated but for reference)
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.startsWith('!buy')) {
        const embed = new MessageEmbed()
            .setDescription('This Command Has Moved To Slash Commands.. Try **/buy** Instead')
            .setColor(message.guild.me.displayHexColor);

        const button = new MessageButton()
            .setLabel('More Info')
            .setURL('https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ')
            .setStyle('LINK');

        const row = new MessageActionRow().addComponents(button);
        await message.reply({ embeds: [embed], components: [row] });
    }

    if (message.content.startsWith('!stock')) {
        const embed = new MessageEmbed()
            .setDescription('This Command Has Moved To Slash Commands.. Try **/stock** Instead')
            .setColor(message.guild.me.displayHexColor);

        const button = new MessageButton()
            .setLabel('More Info')
            .setURL('https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ')
            .setStyle('LINK');

        const row = new MessageActionRow().addComponents(button);
        await message.reply({ embeds: [embed], components: [row] });
    }
});

// Log the bot in
client.login(config.token);
