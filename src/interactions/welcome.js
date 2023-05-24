const welcome = (member) => {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'lounge');

    if(!channel) return;

    channel.send(`Welcome to the server, ${member}!`);

};

module.exports = welcome;