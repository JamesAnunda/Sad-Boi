require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const { Client, GatewayIntentBits } = require('discord.js');
//V14 use GatewayIntentBits
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

//When pinging bot directly
client.on("messageCreate", (message) => {
  if (message.mentions.users.has(client.user.id)) { // this could be modified to make it have to *start* with or have only a ping
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply("i dont know who the fuck or i am! This message had a latency of ${timeTaken}ms.")
  } 
  console.log(message);
  });
// client.on('messsageCreate', function {
//   if (command === "ping") {
//     const timeTaken = Date.now() - message.createdTimestamp;
//     message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
//   }

//Connection to Discord API
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token

