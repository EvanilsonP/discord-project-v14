const { SlashCommandBuilder } = require('@discordjs/builders');

const buttonCommand = new SlashCommandBuilder()
.setName('button')
.setDescription('button cmd')

module.exports = buttonCommand.toJSON();