const { SlashCommandBuilder } = require('@discordjs/builders');

const rolesCommand = new SlashCommandBuilder()
.setName('addrole')
.setDescription('Add a role')
.addRoleOption((option) => option.setName('newrole').setDescription('Adds a new role'));

module.exports = rolesCommand.toJSON();
