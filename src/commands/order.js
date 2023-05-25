const { SlashCommandBuilder } = require('@discordjs/builders');

const orderCommand = new SlashCommandBuilder()
.setName('order')
.setDescription('Order your favorite food')
.addStringOption((option) =>
    option
    .setName('food')
    .setDescription('Order your food')
    .setRequired(true)
    .setChoices({
        name: 'Sushi', 
            value: 'sushi'
        }, 
        {
            name: 'Pizza', 
            value: 'pizza'
        }, 
        {
            name: 'Hamburguer', 
            value: 'hamburguer'
        })

).addStringOption((option) => 
    option
    .setName('drink')
    .setDescription('Order your favorite drink')
    .setRequired(true)
    .setChoices({
        name: 'Coca-Cola', 
        value: 'coca-cola'
    }, 
    {
        name: 'Juice', 
        value: 'Juice'
    }, 
    {
        name: 'Water', 
        value: 'water'
    })
);

module.exports = orderCommand.toJSON();

