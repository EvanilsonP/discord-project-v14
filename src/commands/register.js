const { SlashCommandBuilder } = require('@discordjs/builders');

const registerCommand = new SlashCommandBuilder()
.setName('register')
.setDescription('Register a user to the server officialy');

module.exports = registerCommand.toJSON();