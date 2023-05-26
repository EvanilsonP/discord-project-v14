const { SlashCommandBuilder } = require('@discordjs/builders');

const channelsCommand = new SlashCommandBuilder()
.setName('channels')
.setDescription('channels command')
.addChannelOption(option => option.setName('user').setDescription('user').setRequired(true))
.addChannelOption((option) => option.setName('channel').setDescription('testing').setRequired(true));

module.exports = channelsCommand.toJSON();