require("module-alias/register");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const MongoDBProvider = require("commando-provider-mongo");
const path = require("path");
const { CommandoClient } = require("discord.js-commando");
const loadCommands = require("@root/command-files/load-commands");
const commandBase = require("@root/command-files/command-base");
const loadFeatures = require("@root/feature-files/load-features");
const mongo = require("@util/mongo");

//const modLogs = require("@features/mod-logs");

const client = new CommandoClient({
  commandPrefix: process.env.PREFIX,
  owner: "381906626581626880",
  invite: "https://discord.gg/c8n6mRT",
});
global.client = client

client.setProvider(
  MongoClient.connect(process.env.MONGO_PATH, {
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then((client) => {
      return new MongoDBProvider(client, "");
    })
    .catch((err) => {
      console.error(err);
    })
);

client.once("ready", async () => {
  console.log(`${client.user.username} is ready`);
  client.user.setActivity('arcade help')

  await mongo();

  client.registry
    .registerGroups([
      ["admin", "Admin"],
      ["moderation", "Moderation"],
      ["misc", "Misc"],
      ["informative", "Informative"],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "/command-files/commands"));
  commandBase.loadPrefixes(client);
  loadCommands(client);
  loadFeatures(client);

  //modLogs(client);
});

client.on("error", console.error);
client.login(process.env.BOT_TOKEN);
