const interactions = (message) => {

    if(message.content.toLocaleLowerCase() === 'hello') {
        message.reply('Hello! How are you doing?');

    } else if(message.content.toLocaleLowerCase() === 'hey') {
        message.reply('Hey! How are you doing?');

    } else if(message.content.toLocaleLowerCase() === 'hi') {
        message.reply('Hi! How are you doing?');
    }
};

module.exports = interactions;