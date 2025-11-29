module.exports = async (bot, msg, args, argsF, MessageEmbed) => {
    const num = Math.floor(Math.random() * 100) + 1; 
    /* За счёт обязательной единицы промежуток Х будет равен (0; 100] 
    (От нуля, не включая его, до ста, включая.) */
    const embed = new MessageEmbed()
        .setColor('#f0f0f0')
        // .setAuthor(msg.author.tag, msg.author.displayAvatarURL({dynamic:true})) // в новых версиях пишется через объект
        .setAuthor({
            name: msg.author.tag,
            iconURL:msg.author.displayAvatarURL({ dynamic: true })

        })
        .setDescription(`Привет, ${msg.author}!`)
        .addFields({name: 'Случайное число', value: `**${num}**`, inline:true})
        .setTimestamp();
    
    await msg.reply({ embeds: [embed] }) 
    //fix 1: в discord.js поле называется embeds а не embed
}
module.exports.names = ["random", "rand", "рандом", "случайное"]
