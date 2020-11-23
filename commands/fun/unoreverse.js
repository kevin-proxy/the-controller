const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class unoReverseCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "unoreverse",
      group: "fun",
      memberName: "unoreverse",
      description: "Sends a photo of a uno-reverse card",
      guildOnly: true,
    });
  }
  async run(message, args) {
    const unoUrselfEmbed = new MessageEmbed()
      .setDescription("Stupid, you just uno reversed yourself")
      .setImage("https://i.imgur.com/WUX7tbB.png")
      .setColor(0x3366ff);

    const unoEmbed = new MessageEmbed()
      .setDescription(
        `Haha ${message.mentions.users.first()}, get uno reversed`
      )
      .setColor(0x3366ff)
      .setImage("https://i.imgur.com/WUX7tbB.png");
    if (message.mentions.users.first()) {
      message.channel.send(unoEmbed);
    } else {
      message.channel.send(unoUrselfEmbed);
    }
  }
};
