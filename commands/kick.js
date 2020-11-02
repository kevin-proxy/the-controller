const Discord = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kick members",
  execute(message, args, approvedEmoji, disapprovedEmoji, errEmbed, caseCount) {
    const targetUser = message.mentions.users.first();
    let reason = args.slice(1).join(` `);
    const member = message.guild.member(targetUser);

    if (!message.member.hasPermission("KICK_MEMBERS")) {
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription(
        `${disapprovedEmoji} You do not have permission to kick members!`
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
              `${disapprovedEmoji} You cannot kick a member of staff!`
            );
            isStaffEmbed.setColor(0x3366ff);
            return message.channel.send(isStaffEmbed);
          } else {
            if (!reason) {
              reason = "Unspecified";
            }
            member
              .kick({
                reason: reason,
              })
              .then(() => {
                const successEmbed = new Discord.MessageEmbed();
                successEmbed.setDescription(
                  `${approvedEmoji} Successfully kicked ${targetUser}`
                );
                successEmbed.setColor(0x3366ff);
                message.channel
                  .send(successEmbed)
                  .then((msg) => msg.delete({ timeout: 3000 }))
                  .then(() => {
                    caseCount = +1;
                    const logEmbed = new Discord.MessageEmbed();
                    logEmbed.setTitle(`Kick | Case ${caseCount}`);
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
          `${disapprovedEmoji} Please mention a user to kick!`
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
