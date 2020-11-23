const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");
module.exports = class serverInfoCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      group: "info",
      memberName: "serverinfo",
      description: "Displays information about the server",
      guildOnly: true,
    });
  }
  async run(message, args) {
    const embed = new MessageEmbed()
      .setTitle(message.guild.name)
      .addFields(
        {
          name: "Member count",
          value: message.guild.memberCount,
          inline: true,
        },
        {
          name: "Owner",
          value: message.guild.owner.user.username,
          inline: true,
        },
        {
          name: "Region",
          value: message.guild.region,
          inline: true,
        },
        {
          name: "Date Created",
          value: message.guild.createdAt,
          inline: true,
        },
        {
          name: "Verification Level",
          value: message.guild.verificationLevel,
          inline: true,
        },
        {
          name: "Channel count",
          value: message.guild.channels.cache.size,
          inline: true,
        }
      )
      .setColor(0x3366ff)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp()
      .setThumbnail(
        message.guild.iconURL({
          dynamic: true,
        })
      );

    message.channel.send(embed);
  }
};
