const Discord = require("discord.js");
module.exports = {
  name: "ban",
  description: "Ban members",
  execute(message, args, approvedEmoji, disapprovedEmoji, errEmbed) {
    const targetUser = message.mentions.users.first();
    const reason = args.slice(1).join(` `);
    const member = message.guild.member(targetUser);

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const banPermissionEmbed = new Discord.MessageEmbed();
      banPermissionEmbed.setDescription(
        `${disapprovedEmoji} You do not have permission to ban members!`
      );
      banPermissionEmbed.setColor(0x3366ff);
      return message.channel.send(banPermissionEmbed).then((msg) =>
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
                const banSuccessEmbed = new Discord.MessageEmbed();
                banSuccessEmbed.setDescription(
                  `${approvedEmoji} Successfully banned ${targetUser}`
                );
                banSuccessEmbed.setColor(0x3366ff);
                message.channel
                  .send(banSuccessEmbed)
                  .then((msg) => msg.delete({ timeout: 3000 }))
                  .then(() => {
                    const banLogEmbed = new Discord.MessageEmbed();
                    banLogEmbed.setTitle("Ban");
                    banLogEmbed.addFields(
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
                    message.guild.channels.cache
                      .find((c) => c.id === "769609262636335144")
                      .send(banLogEmbed);
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
          const banNoMemberEmbed = new Discord.MessageEmbed();
          banNoMemberEmbed.setDescription(
            "I cannot find a member with that mention!"
          );
          banNoMemberEmbed.setColor(0x3366ff);
          message.channel
            .send(banNoMemberEmbed)
            .then((msg) => msg.delete({ timeout: 3000 }));
        }
      } else {
        const banNoMentionEmbed = new Discord.MessageEmbed();
        banNoMentionEmbed.setDescription(
          `${disapprovedEmoji} Please mention a user to ban!`
        );
        banNoMentionEmbed.setColor(0x3366ff);
        return message.channel.send(banNoMentionEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      }
    }
  },
};
