const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField, Routes, PermissionsBitField } = require('discord.js');
const { REST } = require('@discordjs/rest')

const online = require('./src/bot/online');
const interactions = require('./src/interactions/interaction');
const welcome = require('./src/interactions/welcome');
const privateMSG = require('./src/interactions/privatemsg');

const orderCommand = require('./src/commands/order');
const suggestionCommand = require('./src/commands/suggestion');
const channelsCommand = require('./src/commands/channel');
const buttonCommand = require('./src/commands/button');
const banCommand = require('./src/commands/ban');
const kickCommand = require('./src/commands/kick');
const rolesCommand = require('./src/commands/roles');
const registerCommand = require('./src/commands/register');
const timeoutCommand = require('./src/commands/timeout');

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

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ verison: '10'}).setToken(TOKEN);

async function main() {                                             // Slash commands
    const commands = [ orderCommand, suggestionCommand, channelsCommand, buttonCommand, banCommand, kickCommand, timeoutCommand, rolesCommand, registerCommand];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        });
    } 

    catch (err) {
        console.log(err);
    }
};

main();

// client.on('interactionCreate', (interaction) => {
//     if(interaction.isChatInputCommand()) {

//         const food = interaction.options.get('food').value;
//         const drink = interaction.options.get('drink').value;

//         interaction.reply(`You favorite food is ${food} and your favorite drink is ${drink}`);
//     }
// });

client.on('interactionCreate', (interaction) => {

    if(interaction.commandName === 'suggestion') {

        const movie = interaction.options.getString('movie');

        if(movie === 'interstellar') {
            interaction.reply('Movie: Interstellar\nSynopsis: When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.\nIMDB rating: 8.7/10.\nRotten tomatoes: 73%');

        } else if(movie === '12 angry men') {
            interaction.reply('Movie: 12 Angry Men.\nSynopsis: A jury must determine the fate of a teenager charged with murder.\nIMDB rating: 9/10.\nRotten tomatoes: 100%');

        } else if(movie === 'la vita è bella') {
            interaction.reply('Movie: La vita è bella.\nSynopsis: A Jewish father and his family are surrounded by Nazi death camps. Living in a hostile environment, he uses humour to shield his young son from the grim realities of the war.\nIMDB rating: 8.6/10.\nRotten tomatoes: 80%');

        } else if(movie === 'it is a wonderful life') {
            interaction.reply('Movie: It is a wonderful life.\nSynopsis: When a frustrated businessman, George Bailey, becomes suicidal, an angel from heaven, Clarence, is sent to him. To his change of heart, she shows him what life would have been without his existence.\nIMDB rating: 8.6/10.\nRotten tomatoes: 94%');

        } else if(movie === 'pyscho') {
            interaction.reply('Movie: Psycho.\nSynopsis: Marion disappears after stealing money from her employer. Her lover and sister try to find her and end up reaching the infamous Bates Motel, where they meet Norman Bates.\nIMDB rating: 8.5/10.\nRotten tomatoes: 96%');
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    if(interaction.commandName === 'ban') {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);

        if(member) {
            try {
                await member.ban({
                    reason: reason || undefined
                });
                await interaction.reply({
                    content: `${user.tag} has been banned.`,
                    ephemeral: true,
                  });
            } 
            catch (error) {
                console.error(`Failed to ban ${user.tag}: ${error}`);   
                await interaction.reply({
                    content: `Failed to ban ${user.tag}.`,
                    ephemeral: true,
                  });
            }
        } else {
            await interaction.reply({
                content: `User ${user.tag} is not a member of this guild.`,
                ephemeral: true,
            });
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    if(interaction.commandName === 'kick') {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);

        if(member) {
            try {
                await member.kick({
                    reason: reason || undefined
                });
                await interaction.reply({
                    content: `${user.tag} has been kicked.`,
                    ephemeral: true,
                  });
            } 
            catch (error) {
                console.error(`Failed to kick ${user.tag}: ${error}`);   
                await interaction.reply({
                    content: `Failed to kick ${user.tag}.`,
                    ephemeral: true,
                  });
            }
        } else {
            await interaction.reply({
                content: `User ${user.tag} is not a member of this guild.`,
                ephemeral: true,
            });
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName, options } = interaction;
  
    if (commandName === 'timeout') {
      const user = options.getUser('user');
      const duration = options.getString('duration');
      const reason = options.getString('reason');
  
      const member = interaction.guild.members.cache.get(user.id);
  
      if (member) {
        try {
          const timeoutRole = interaction.guild.roles.cache.find(role => role.name === 'Timeout');
  
          if (!timeoutRole) {
            // Create a role named "Timeout" if it doesn't exist
            const createdRole = await interaction.guild.roles.create({
              name: 'Timeout',
              color: '#ff0000',
              permissions: [],
              reason: 'Timeout role for temporary member restrictions',
            });
  
            await member.roles.add(createdRole, reason || undefined);
          } else {
            await member.roles.add(timeoutRole, reason || undefined);
          }
  
          await interaction.reply({
            content: `${user.tag} has been timed out for ${duration}.`,
            ephemeral: true,
          });
  
          setTimeout(async () => {
            if (timeoutRole) {
              await member.roles.remove(timeoutRole, 'Timeout duration has expired');
              await interaction.followUp(`${user.tag} has been un-timed out.`);
            }
          }, ms(duration));
        } catch (error) {
          console.error(`Failed to timeout ${user.tag}: ${error}`);
          await interaction.reply({
            content: `Failed to timeout ${user.tag}.`,
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: `User ${user.tag} is not a member of this guild.`,
          ephemeral: true,
        });
      }
    }
  });

client.on('messageCreate', interactions, welcome, privateMSG);        // Interacts with the user
client.on('ready', online);                                          // When our bot is online
client.login(TOKEN);                                                // Log in into our discord bot 