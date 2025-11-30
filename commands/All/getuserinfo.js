const { MessageEmbed } = require("discord.js");

module.exports = async (bot, ctx, args, argsF) => {
    const member =
        ctx.mentions.members?.first() ||
        (args[0] && ctx.guild.members.cache.get(args[0])) ||
        ctx.member;

    if (!member) { return ctx.reply("Не могу найти такого пользователя.")}

    const roles =
        members.roles.cache
            .filter ((r) => r.id !== ctx.guild.id)
            .map((r) => r.toString())
            .join(", ") || "Нет ролей";

    const embed = new MessageEmbed()
        .setTitle("Информация о человеке")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField("Ник", `${member.user.tag}`, true)
        .addField("ID", member.id, true)
        .addField("Создан", `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, true)
        .addField("Зашёл на сервер", `t${Math.floor(member.joinedTimestamp / 1000)}:R>`, true)
        .addField("роли", roles)
        .setTimestamp();

    await ctx.reply({ embeds: [embed] });
};

module.exports.names = ["userinfo", "user", "юзер", "инфо"];
module.exports.description = "Показывает информацию о пользователе и его ролях";