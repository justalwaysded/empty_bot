const fs = require("fs")
const path = require("path")
module.exports = async (bot, msg, args, argsF, MessageEmbed) => {
    const materialsPath = path.resolve(__dirname, "../../materials");
    const files = fs.readdirSync(materialsPath)
        .filter(file => file.endsWith(".gif") || file.endsWith(".png") || file.endsWith(".jpg"));

    if (files.length === 0) {
        return msg.reply("Нет гифок, сосём бибу.");
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.resolve(materialsPath, randomFile);

    const embed = new MessageEmbed()
        .setColor("#3aff43")
        .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Рандомный мем для ${msg.author}!`)
        .setImage("attachment://" + randomFile)
        .setTimestamp();

    await msg.reply({ embeds: [embed], files: [{ attachment: filePath, name: randomFile }] })

};

module.exports.names = ["random-meme", "random_meme", "рандом-мем", "рандом_мем"]