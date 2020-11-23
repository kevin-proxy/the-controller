const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");
module.exports = class userInfoCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "userinfo",
      group: "info",
      memberName: "userinfo",
      description: "Displays information about a user",
      guildOnly: true,
    });
  }
  async run(message, args) {
    let targetUser = message.mentions.users.first();
    let member = message.guild.member(targetUser);

    if (!targetUser) {
      targetUser = message.author;
    }
    if (member == null) {
      member = message.guild.member(message.author);
    }
    const userInfoEmbed = new MessageEmbed()
      .setTitle(targetUser.username)
      .setDescription(
        `**Tag:** ${targetUser.tag}\n**ID:** ${
          targetUser.id
        }\n**Account Type:** ${targetUser.bot ? "Bot" : "User"}`
      )
      .setColor(0x3366ff)
      .setThumbnail(
        targetUser.displayAvatarURL({
          dynamic: true,
        })
      )
      .addFields(
        {
          name: "Account Created At",
          value: `${targetUser.createdAt}`,
          inline: true,
        },
        {
          name: "Joined Server At",
          value: `${member.joinedAt}`,
          inline: true,
        }
      )
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(userInfoEmbed);
  }
};
