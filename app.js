const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField } = require('discord.js');

const online = require('./src/bot/online');
const interactions = require('./src/interactions/interaction');

// intents are a set of permissions that your bot can use in order to get access to a set of events
// client is our bot instance
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('messageCreate', interactions);     // Interacts with the user
client.on('ready', online);                   // When our bot is online
client.login(process.env.TOKEN);              // Log in into our discord bot