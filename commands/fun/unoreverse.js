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

    const embed = new MessageEmbed()
      .setDescription(
        message.mentions.users.first()
          ? `Haha ${message.mentions.users.first()}, get uno reversed`
          : "Stupid, you just uno reversed yourself"
      )
      .setColor(0x3366ff)
      .setImage("https://i.imgur.com/WUX7tbB.png");

    message.channel.send(embed)
  }
};
