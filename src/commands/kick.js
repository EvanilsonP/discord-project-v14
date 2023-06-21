const { SlashCommandBuilder } = require('@discordjs/builders');

const kickCommand = new SlashCommandBuilder()
.setName('kick')
.setDescription('Kicks a member from this server')
.addUserOption(Option => Option.setName('user').setDescription('The reason for the kick').setRequired(false))

module.exports = kickCommand.toJSON();