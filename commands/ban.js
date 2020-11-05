const Discord = require("discord.js");
module.exports = {
  name: "ban",
  description: "ban members",
  execute(message, args) {
    const targetUser = message.mentions.users.first();
    let reason = args.slice(1).join(` `);
    const member = message.guild.member(targetUser);

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription(
        `${disapprovedEmoji} You do not have permission to ban members!`
      );
      noPermissionEmbed.setColor(0x3366ff);
      return message.channel.send(noPermissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else {
      if (targetUser) {
        if (member) {
          if (member.roles.cache.has("749421428339638332")) {
            const isStaffEmbed = new Discord.MessageEmbed();
            isStaffEmbed.setDescription(
              `${disapprovedEmoji} You cannot ban a member of staff!`
            );
            isStaffEmbed.setColor(0x3366ff);
            return message.channel.send(isStaffEmbed);
          } else {
            if (!reason) {
              reason = "Unspecified";
            }
            member
              .ban({
                reason: reason,
              })
              .then(() => {
                const successEmbed = new Discord.MessageEmbed();
                successEmbed.setDescription(
                  `${approvedEmoji} Successfully banned ${targetUser}`
                );
                successEmbed.setColor(0x3366ff);
                message.channel
                  .send(successEmbed)
                  .then((msg) => msg.delete({ timeout: 3000 }))
                  .then(() => {
                    const logEmbed = new Discord.MessageEmbed();
                    logEmbed.setTitle(`Ban`);
                    logEmbed.addFields(
                      {
                        name: "Offending Member",
                        value: `${targetUser.tag} (${member.id})`,
                        inline: false,
                      },
                      {
                        name: "Responsible Moderator",
                        value: message.author.tag,
                        inline: false,
                      },
                      {
                        name: "Reason",
                        value: reason,
                        inline: false,
                      }
                    );
                    logEmbed.setColor(0xc93838)
                    logEmbed.setTimestamp();
                    message.guild.channels.cache
                      .find((c) => c.id === "769609262636335144")
                      .send(logEmbed);
                  });
              })
              .catch((err) => {
                message.channel.send(errEmbed).then((msg) =>
                  msg.delete({
                    timeout: 3000,
                  })
                );
                console.error(err);
              });
          }
        } else {
          const noMemberEmbed = new Discord.MessageEmbed();
          noMemberEmbed.setDescription(
            "I cannot find a member with that mention!"
          );
          noMemberEmbed.setColor(0x3366ff);
          message.channel
            .send(noMemberEmbed)
            .then((msg) => msg.delete({ timeout: 3000 }));
        }
      } else {
        const noMentionEmbed = new Discord.MessageEmbed();
        noMentionEmbed.setDescription(
          `${disapprovedEmoji} Please mention a user to ban!`
        );
        noMentionEmbed.setColor(0x3366ff);
        return message.channel.send(noMentionEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      }
    }
  },
};
