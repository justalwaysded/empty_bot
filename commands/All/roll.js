const { MessageEmbed } = require("discord.js")
module.exports = async (bot, ctx, args, argsF) => {
    const num = Math.floor(Math.random() * 100) + 1;

    const embed = new MessageEmbed()
        .setTitle("Случайное число")
        .setDescription(`Ты выкрутил: **${num}**`)
        .setTimestamp()
        .setFooter({ text: ctx.author.tag, iconURL: ctx.author.displayAvatarURL ({ dynamic: true }) });

    await ctx.reply({ embeds: [embed] });
};

module.exports.names = ["roll", "ролл"];
module.exports.description = "Выкручивает случайное число от 1 до 100";