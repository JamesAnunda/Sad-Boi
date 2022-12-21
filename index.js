require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const rest = new REST({ version: '14' }).setToken(CLIENT_TOKEN);
//V14 use GatewayIntentBits
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

//Commands
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


//When pinging bot directly
client.on("messageCreate", (message) => {
  if (message.mentions.users.has(client.user.id)) { // this could be modified to make it have to *start* with or have only a ping
    const timeTaken = Date.now() - message.createdTimestamp;
    console.log(timeTaken.toString());
    message.reply(`i dont know who or what i am! This message had a latency of ${timeTaken} ms.`)
  } 
  console.log(message);
  });

//Typing ping in the bot channel
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!'); 
  }
});


//Connection to Discord API
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using tokenizer 
