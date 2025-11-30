/* module.exports = async (bot, msg) => {
    const Discord = require('discord.js')
    const { MessageEmbed, MessageButton, MessageSelectMenu, MessageActionRow } = require("discord.js")

    if (msg.author.bot) return
    console.log(`message from ${msg.author.tag} in ${msg.guild ? msg.guild.name : 'DM'}: ${msg.content ? msg.content.slice(0,100) : '<empty>'}`);
    const { content, author, guild } = msg
    const config = require('./config.json')

    if (!content || content.length < config.prefix.length) return
    if (content.slice(0, config.prefix.length) !== config.prefix) return

    const
        messageArray = content.split(' '),
        command = messageArray[0].slice(config.prefix.length).toLowerCase(),
        args = messageArray.slice(1),
        messageArrayFull = content.split(' '),
        argsF = messageArrayFull.slice(1),
        commandRun = bot.commands.get(command);

    if (commandRun) {
      try {
        await commandRun(bot, msg, args, argsF, MessageEmbed, MessageButton, MessageSelectMenu, MessageActionRow, config, Discord)
      } catch (err) {
        console.error('Command execution error:', err)
        try { msg.reply('Ошибка при выполнении команды.'); } catch(e){ /* silent */ /*}
}
}
} */

module.exports = async (bot, msg) => {
  const { content, author } = msg;
  const config = require('./config.json');

  if (author.bot) return;
  if (!content || content.length < config.prefix.length) return;
  if (!content.startsWith(config.prefix)) return;

  const messageArray = content.trim().split(/\s+/);
  const commandName = messageArray[0].slice(config.prefix.length).toLowerCase();
  const args = messageArray.slice[1];
  const argsF = {}; //место для парсинга вроде key=value

  const commandRun = bot.command.get(commandName);
  if (!commandRun) return;

  try { 
    await commandRun(bot, msg, args, argsF);
  } catch (err) {
    console.error("Command execution error:", err);
    try { await msg.reply("Ошибка при выполнении команды."); } catch (_) {}
  }
};