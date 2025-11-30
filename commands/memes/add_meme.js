const fs = require("fs");
const path = require("path");
const https = require("https");
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, ctx, args, argsF) => {
    const reply = ctx.reference
        ? await ctx.channel.messages.fetch(ctx.reference.messageId).catch(() => null)
        : null;

    if (!reply) { return ctx.reply("Ответь на соощение с картинкой, что бы добавить мем.") };

    const attachment = reply.attachments.first();
    if (!attachment) { return ctx.reply("В ответном сообщении нет вложений.") };

    const url = attachment.url;
    const extMatch = url.match(/\.(png|jpe?g|gif|webp)$/i);

    if (!extMatch) { return ctx.reply("Поддерживаются только картинки png, jpg, jpeg, gid, webp.") };

    const ext = extMatch[1].toLowercase(); //преобразование 1-го символа расширения в lowercase.
    const memesDir = path.join(__dirname, "../../materials");

    if (!fs.existsSync(memesDir)) { fs.mkdirSync(memesDir, { recursive: true }) };

    const fileName = `${Date.now()}_${ctx.author.id}.${ext}`;
    const filePath = path.join(memesDir, fileName);

    try {
        await downloadFile(url, filePath);
        await ctx.reply("Мем успешно добавлен в каталог.")
    } catch (err) {
        console.error(err);
        await ctx.reply("Не удалось сохранить мем.")
    }
};

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https
            .get(url, (res) => {
                if (res.statusCode !== 200) {
                    file.close();
                    fs.unlink(dest, () => { });
                    return reject(new Error(`HTTP status ${res.statusCode}`));
                }
                res.pipe(file);
                file.on("finish", () => file.close(resolve));
            })
            .on("error", (err) => {
                file.close();
                fs.unlink(dest, () => { });
                reject(err);
            })
    })
}

module.exports.names = ["add-meme", "add_meme", "addmeme", "добавить-мем", "добавить_мем"];
module.exports.description = ['Добавляет мем в каталог по реплаю (ответу) на сообщение с картинкой.']