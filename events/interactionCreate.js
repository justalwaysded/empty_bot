module.exports = async (bot, interaction) => {
    if (interaction.isCommand()) {
        if (bot.tex) return interaction.reply("Бот на тех обслуживании");
        const argsF = {};
        argsF.slash = true;
        if (interaction.options._group) argsF.group = interaction.options._group;
        if (interaction.options._subcommand) argsF.subcommand = interaction.options._subcommand;
        for (const it of interaction.options._hoistedOptions) argsF[it.name] = it.value;
        const CMD = await bot.commands.get(interaction.commandName);
        const args = argsF;
        interaction.author = interaction.user;
        interaction.channel = bot.channels.cache.get(interaction.channelId);
        interaction.guild = interaction.member.guild;
        if (CMD) {
            try {
                await CMD(bot, interaction, args, argsF)
            } catch (err) {
                console.error('Slash command error:', err)
                if (!interaction.replied && !interaction.deferred) {
                    try { interaction.reply({ content: 'Ошибка при выполнении команды.', ephemeral: true }) } catch(e){ /* silent */ }
                }
            }
        }
    }
};
