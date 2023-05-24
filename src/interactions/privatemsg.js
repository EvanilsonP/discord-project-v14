const privateMSG = (member) => {

    const welcomeMessage = `Welcome, ${member}! We're glad you joined our server. Enjoy your stay!`;

    member.send(welcomeMessage)
    
    .then(() => console.log(`Sent a welcome message to ${member.user.tag}`))
    .catch(console.error);

};