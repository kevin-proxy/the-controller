const Discord = require("discord.js");
module.exports = {
  commands: "coin-flip",
  callback: (message, args, text, client) => {
    const tails = client.emojis.cache.find((t) => t.name === "tails");
    const heads = client.emojis.cache.find((h) => h.name === "heads");

    function doRandHT() {
      var rand = [`You got heads! ${heads}`, `You got tails! ${tails}`];
      return rand[Math.floor(Math.random() * rand.length)];
    }

    message.reply(doRandHT())
  },
};
