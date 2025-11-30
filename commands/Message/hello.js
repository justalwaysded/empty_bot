const { MessageEmbed } = require("discord.js")
module.exports = async (bot, ctx, args, argsF) => {
  await ctx.reply(`${ctx.author}, Привет!`)
};

module.exports.names = ["hello", "привет", "hi"];
module.exports.description = "Приветствует пользователя.";