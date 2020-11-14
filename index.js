require("module-alias/register");
require("dotenv").config();

const loadCommands = require("@root/command-files/load-commands");
const loadFeatures = require("@root/feature-files/load-features");
const mongo = require("@util/mongo");
const Discord = require("discord.js");
const client = new Discord.Client();

//client.setMaxListeners(30);

client.on("ready", async () => {
  console.log(`The client is ready`);
  client.user.setActivity("arcade help");

  await mongo();
  loadCommands(client);
  loadFeatures(client);
});

client.on("error", console.error);

module.exports.client = client;

client.login(process.env.BOT_TOKEN);
