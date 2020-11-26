const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class diceRollCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "diceroll",
      group: "fun",
      memberName: "diceroll",
      description: "Rolls one 6 headed die",
      guildOnly: true,
    });
  }
  async run(message, args) {
    function firstDie() {
      var dieOne = Math.floor(Math.random() * 6) + 1;
      return dieOne;
    }

    function secondDie() {
      var dieTwo = Math.floor(Math.random() * 6) + 1;
      return dieTwo;
    }

    const embed = new MessageEmbed()
      .setDescription(
        `You rolled a **${firstDie()}** and a **${secondDie()}**!`
      )
      .setColor(0x3366ff);

    message.channel.send(embed);
  }
};
