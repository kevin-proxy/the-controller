const Discord = require("discord.js");
module.exports = {
  commands: "user-info",
  callback: (message, args) => {
    let targetUser = message.mentions.users.first();
    let member = message.guild.member(targetUser);

    if (!targetUser) {
      targetUser = message.author
    }
    if (member == null) {
      member = message.guild.member(message.author)
    }
    const userInfoEmbed = new Discord.MessageEmbed();
      userInfoEmbed.setTitle(targetUser.username);
      userInfoEmbed.setDescription(
        `**Tag:** ${targetUser.tag}\n**ID:** ${targetUser.id}\n**Account Type:** ${targetUser.bot ? "Bot" : "User"}`
      );
      userInfoEmbed.setColor(0x3366ff);
      userInfoEmbed.setThumbnail(
        targetUser.displayAvatarURL({
          dynamic: true,
        })
      );
      userInfoEmbed.addFields(
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
      );
      userInfoEmbed.setFooter(`Requested by ${message.author.username}`);
      userInfoEmbed.setTimestamp();

      message.channel.send(userInfoEmbed);
  },
};
