const Commando = require("discord.js-commando");

module.exports = class coinFlip extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "coinflip",
      group: "fun",
      memberName: "coinflip",
      description: "Flips a coin and tells you the result",
      guildOnly: true,
    });
  }
  async run(message, args) {
    const tails = this.client.emojis.cache.find((e) => e.name === "tails")
    const { emojis } = require("./../../index");
    function doRandHT() {
      var rand = [`You got heads! ${emojis.heads}`, `You got tails! ${tails}`];
      return rand[Math.floor(Math.random() * rand.length)];
    }

    message.reply(doRandHT());
  }
};
