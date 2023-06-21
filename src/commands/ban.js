const { SlashCommandBuilder } = require('@discordjs/builders');

const banCommand = new SlashCommandBuilder()
.setName('ban')
.setDescription('Bans a member from this server')
.addUserOption(Option => Option.setName('user').setDescription('The reason for the ban').setRequired(false))
// .addBooleanOption(option => option.setName('delete-messages').setDescription('Delete user messages').setRequired(false))
// .addStringOption(option => option.setName('days').setDescription('Number of days to delete messages').setRequired(false))

module.exports = banCommand.toJSON();