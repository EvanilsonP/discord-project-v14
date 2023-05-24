const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField } = require('discord.js');
const online = require('./src/bot/online');

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

// When our bot is online
client.on('ready', online);

// Log in into our discord bot
client.login(process.env.TOKEN);