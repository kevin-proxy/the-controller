require("module-alias/register");
require("dotenv").config();

const loadCommands = require("@root/command-files/load-commands");
const commandBase = require("@root/command-files/command-base");
const loadFeatures = require("@root/feature-files/load-features");
const mongo = require("@util/mongo");
const Discord = require("discord.js");
const client = new Discord.Client();

const approvedEmoji = client.emojis.cache.find(
  (e) => e.id === "775106753054244885"
);
global.approvedEmoji = approvedEmoji;
const disapprovedEmoji = client.emojis.cache.find(
  (e) => e.id === "775106753054244885"
);
global.disapprovedEmoji = disapprovedEmoji;

client.setMaxListeners(30);

client.on("ready", async () => {
  console.log(`${client.user.username} is ready`);
  client.user.setActivity("arcade help");

  await mongo();
  commandBase.loadPrefixes(client);
  loadCommands(client);
  loadFeatures(client);
});

client.on("error", console.error);

client.login(process.env.BOT_TOKEN);
