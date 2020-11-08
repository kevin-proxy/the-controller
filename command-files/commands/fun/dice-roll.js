const Discord = require("discord.js");
module.exports = {
  commands: "dice-roll",
  callback: (message) => {
    function firstDie() {
      var dieOne = Math.floor(Math.random() * 6) + 1;
      return dieOne;
    }

    function secondDie() {
      var dieTwo = Math.floor(Math.random() * 6) + 1;
      return dieTwo;
    }

    const diceEmbed = new Discord.MessageEmbed();
    diceEmbed.setDescription(
      `You rolled a **${firstDie()}** and a **${secondDie()}**!`
    );
    diceEmbed.setColor(0x3366ff);

    message.channel.send(diceEmbed);
  },
};
