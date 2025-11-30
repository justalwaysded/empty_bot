module.exports = async (bot, ctx, args, argsF) => {
    const sent = await ctx.reply('Ping...');

    const latency = sent.createdTimestamp - ctx.createdTimestamp;
    const apiPing = Math.round(bot.ws.ping);

    await sent.edit(`Pong!\nЗадержка сообщения: ${latency}ms\nApi ping: ${apiPing}ms`);
};

module.exports.names = ["ping", "пинг", "latency", "задержка"]
module.exports.description = ["Проверка задержки."]