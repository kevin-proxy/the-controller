require("module-alias/register");
require("dotenv").config();

const path = require("path");
const Commando = require("discord.js-commando");
const MongoDBProvider = require("commando-provider-mongo");
const { MongoClient } = require("mongodb");
const loadFeatures = require("./feature-files/load-features");

const client = new Commando.CommandoClient({
  owner: "381906626581626880",
  commandPrefix: process.env.PREFIX,
});

client.setProvider(
  MongoClient.connect(process.env.MONGO_PATH, {
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then((client) => {
      return new MongoDBProvider(client, "Kevin");
    })
    .catch((err) => {
      console.error(err);
    })
);

module.exports = (emojis) => {
  emojis = {
    crossEmoji: client.emojis.cache.find((e) => e.name === "cross"),
    checkEmoji: client.emojis.cache.find((e) => e.name === "check"),
    tails: client.emojis.cache.find((e) => e.name === "tails"),
    heads: client.emojis.cache.find((e) => e.name === "heads"),
  }
};

client.on("ready", () => {
  console.log(`The client is ready`);
  client.user.setPresence({
    activity: { name: "the server! =help", type: "WATCHING" },
    status: "dnd",
  });

  client.registry
    .registerGroups([
      ["mod", "Moderation"],
      ["info", "Informative"],
      ["fun", "Fun"],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));
  loadFeatures(client);
});

client.login(process.env.BOT_TOKEN);
