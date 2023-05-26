const { SlashCommandBuilder } = require('@discordjs/builders');

const banCommand = new SlashCommandBuilder()
.setName('ban')
.setDescription('bans a user from the guild')

module.exports = banCommand.toJSON();
