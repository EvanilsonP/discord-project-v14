const { SlashCommandBuilder } = require('@discordjs/builders');

const suggestionCommand = new SlashCommandBuilder()
.setName('suggestion')
.setDescription('My top 5 favorite movies of all time')
.addStringOption((option) =>
    option
    .setName('movie')
    .setDescription('Select a movie')
    .setRequired(true)
    .setChoices({
        name: "Interstellar",
        value: 'interstellar'
    },

    {        
        name: '12 angry men',
        value: '12 angry men'
    },

    {        
        name: 'It is a wonderful life',
        value: 'it is a wonderful life'
    },


    {        
        name: 'La vita è bella',
        value: 'la vita è bella'
    },
    {        
        name: 'Psycho',
        value: 'pyscho'
    },
    )
)

module.exports = suggestionCommand.toJSON();