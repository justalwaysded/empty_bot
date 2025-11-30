require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const interactionCreate = require('./interactionCreate');
const { description } = require('../commands/memes/random_meme');

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.BOT_TOKEN;

const commands = [];
const commandsPath = path.join(__dirname);
const files = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of files) {
    if (['Client.ks', 'index.js', 'ready.js', 'messageCreate.js', 'interactionCreate.js'].includes(file)) continue;
    
    const cmd = require(path.join(commandsPath, file));
    if (!cmd.names || !cmd.names[0] || !cmd.description) continue;

    commands.push({
        name: cmd.names[0],
        description: cmd.description,
        options: []
    });
};

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Updating slash-commands...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        console.log('Ready');
    } catch (error) {
        console.error(error);
    }
})();