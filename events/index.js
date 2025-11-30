module.exports = async (bot) => {
    bot
        .on('ready', () => require('./ready')(bot))
        //.on('messageCreate', (msg) => require('./messageCreate')(bot, msg))
        .on('interactionCreate', (interaction) => require('./interactionCreate')(bot, interaction))
};