const fs = require("fs")
const path = require("path")
const { MessageEmbed } = require("discord.js")

module.exports = async (bot, ctx, args, argsF) => {

    const memesDir = path.resolve(__dirname, "../../materials");

    if (!fs.existsSync(memesDir)) { return ctx.reply("Папка с мемами не найдена") };

    const files = fs.readdirSync(memesDir).filter((file) => 
        /\.(png|jpe?g|gif|webp)$/i.test(file)
    );

    if (files.length === 0) {
        return ctx.reply("Нет мемов, сосём бибу.");
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.resolve(memesDir, randomFile);

    await ctx.reply({ files: [filePath] })

};

module.exports.names = ["random-meme", "random_meme", "рандом-мем", "рандом_мем"]
module.exports.description = ["Присылает рандомную картинку или гифку из каталога."]