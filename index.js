require("module-alias/register");
require("dotenv").config();

const Commando = require("discord.js-commando");
const MongoDBProvider = require("commando-provider-mongo");

const client = new Commando.CommandoClient({
  owner: "381906626581626880",
  commandPrefix: process.env.PREFIX,
});

client.setProvider(
  require("mongodb").MongoClient.connect(process.env.MONGO_PATH, {
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


module.exports.emojis = () => {
  const emojis = {
    crossEmoji: client.emojis.cache.find((e) => e.name === "cross"),
    checkEmoji: client.emojis.cache.find((e) => e.name === "check"),
    tails: client.emojis.cache.find((e) => e.name === "tails"),
    heads: client.emojis.cache.find((e) => e.name === "heads"),
  }
}

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
    .registerCommandsIn(require("path").join(__dirname, "commands"));
  require("./feature-files/load-features")(client);
});

client.login(process.env.BOT_TOKEN);
