module.exports = async (bot, msg, args, argsF, MessageEmbed) => {
    const num = Math.floor(Math.random() * 100) + 1; 
    const embed = new MessageEmbed()
        .setColor('#3aff43')
        .setAuthor({ name: msg.author.tag, iconURL:msg.author.displayAvatarURL({ dynamic: true })})
        .setDescription(`Привет, ${msg.author}!`)
        .addFields({name: 'Случайное число', value: `**${num}**`, inline:true})
        .setTimestamp();
    
    await msg.reply({ embeds: [embed] }) 
}
module.exports.names = ["random", "rand", "рандом", "случайное"]
