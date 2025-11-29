const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async (bot, msg, args, argsF, MessageEmbed) => {
    if (!msg.reference) {return msg.reply("Ответьте командой на сообщение с файлом формата `.gif`, `.png`, `.jpg`, `.jpeg` или `.webp`")};
       
    const referenced = await msg.channel.messages.fetch(msg.reference.messageId);
    
    if (!referenced.attachments.size) {return msg.reply("В вашем сообщении нет файла.")};

    const file = referenced.attachments.first();
    const allowed = [".gif", ".png", ".jpg", ".jpeg", ".webp"];
    const ext = path.extname(file.name).toLowerCase();
    
    if (!allowed.includes(ext)) { return msg.reply("Я принимаю только картинки и гифки.")};

    const materialsPath = path.resolve(__dirname, "../../materials");
    const savePath = path.join(materialsPath, file.name);

    const response = await axios.get(file.url, { responseType: "arraybuffer" });

    fs.writeFileSync(savePath, response.data);

    return msg.reply(`Мем сохранён как **${file.name}**.`)
};

module.exports.names = ["add-meme", "add_meme", "добавить-мем", "добавить_мем"];