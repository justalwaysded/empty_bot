require('dotenv').config(); //библиотека шифровки
const { Client, Intents, Collection } = require('discord.js')
const fs = require("fs")
const path = require('path')
const cfg = require('./events/config.json')
const intentsNames = (cfg.cfg && Array.isArray(cfg.cfg.intents)) ? cfg.cfg.intents : ['GUILDS','GUILD_MESSAGES'];
const intents = intentsNames.map(name => {
  if (Intents.FLAGS[name]) return Intents.FLAGS[name];
  console.warn(`Unknown intent in config: ${name}`);
  return null;
}).filter(Boolean);
if (intents.length === 0) {
  intents.push(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
}
const bot = new Client({ intents })

bot.commands = new Collection()
bot.commands.any = [];

fs.readdirSync('./commands').forEach(module => {
  const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', module, file));
    command.category = module;
    command.names.forEach(el => {
      bot.commands.set(el.toLowerCase(), command)
    });
    bot.commands.any.push(command)
  }
})

console.log('BOT_TOKEN loaded:', Boolean(process.env.BOT_TOKEN));

require('./events/index.js')(bot);

bot.login(process.env.BOT_TOKEN)

bot.on('messageCreate', async (msg) => {

})
