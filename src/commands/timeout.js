const { SlashCommandBuilder} = require('@discordjs/builders');

const timeOutCommand = new SlashCommandBuilder()
.setName('timeout')
.setDescription('Timeouts a member from this server')
.addStringOption(option => option.setName('duration').setDescription('The duration of the timeout').setRequired(true))
.addUserOption(Option => Option.setName('user').setDescription('The reason for the timeout').setRequired(false))

module.exports = timeOutCommand.toJSON();

