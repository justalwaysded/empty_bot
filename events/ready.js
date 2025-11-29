module.exports = async (bot) => {
    const { MessageEmbed } = require("discord.js")
    const qq = new MessageEmbed()
        .setColor(0xffffff)
        .setDescription(`**${bot.user.tag}: Запустился!**`)
    console.log(`***`)
    try {
      const ch = bot.channels.cache.get("1329478453824585811")
      if (ch) await ch.send({ embeds: [qq] })
      else console.warn('Ready: channel 1329478453824585811 not found or not cached.')
    } catch (err) {
      console.error('Error while sending ready embed:', err)
    }
    try {
      bot.user.setPresence({
          status: 'online',
          activities: [
              {
                  name: ' %hello',
                  type: 3
              }
          ]
      });
    } catch (err) {
      console.error('Error setting presence:', err)
    }
}
