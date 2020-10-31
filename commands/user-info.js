const Discord = require("discord.js");
module.exports = {
  name: "user-info",
  description: "Displays information of a user",
  execute(message) {
    const targetUser = message.mentions.users.first();
    const member = message.guild.member(targetUser);
    const authorMember = message.guild.member(message.author);

    if (!targetUser) {
      const myInfoEmbed = new Discord.MessageEmbed();
      myInfoEmbed.setTitle(message.author.username);
      myInfoEmbed.setDescription(
        `**Tag:** ${message.author.tag}\n**ID:** ${message.author.id}\n**Bot Account:** ${message.author.bot}`
      );
      myInfoEmbed.setColor(0x3366ff);
      myInfoEmbed.addFields(
        {
          name: "Account Created At",
          value: message.author.createdAt,
          inline: true,
        },
        {
          name: "Joined Server At",
          value: authorMember.joinedAt,
          inline: true,
        }
      );
      myInfoEmbed.setFooter(`Requested by ${message.author.username}`);
      myInfoEmbed.setThumbnail(
        `${message.author.displayAvatarURL({ dynamic: true })}`
      );
      myInfoEmbed.setTimestamp();

      message.channel.send(myInfoEmbed);
    } else {
      const userInfoEmbed = new Discord.MessageEmbed();
      userInfoEmbed.setTitle(targetUser.username);
      userInfoEmbed.setDescription(
        `**Tag:** ${targetUser.tag}\n**ID:** ${targetUser.id}\n**Bot Account:** ${targetUser.bot}`
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
      userInfoEmbed.setTimestamp;

      message.channel.send(userInfoEmbed);
    }
  },
};
