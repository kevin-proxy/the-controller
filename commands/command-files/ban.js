const Discord = require("discord.js");
module.exports = {
  name: "ban",
  description: "Ban members",
  execute(message, args) {
    const banEmbeds = require("./message-embed-files/ban-embeds.js");

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(banEmbeds.noPermissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else {
      if (targetUserMention) {
        if (memberOfMention) {
          if (memberOfMention.roles.cache.has("749421428339638332")) {
            return message.channel.send(banEmbeds.isStaffEmbed);
          } else {
            if (!behindArgsOne) {
              behindArgsOne = "Unspecified";
            }
            memberOfMention
              .ban({
                reason: behindArgsOne,
              })
              .then(() => {
                message.channel
                  .send(banEmbeds.successEmbed)
                  .then((msg) => msg.delete({ timeout: 3000 }))
                  .then(() => {
                    const banLogEmbed = new Discord.MessageEmbed();
                    banLogEmbed.setTitle("Ban");
                    banLogEmbed.addFields(
                      {
                        name: "Offending Member",
                        value: `${targetUserMention.tag} (${memberOfMention.id})`,
                        inline: false,
                      },
                      {
                        name: "Responsible Moderator",
                        value: message.author.tag,
                        inline: false,
                      },
                      {
                        name: "Reason",
                        value: behindArgsOne,
                        inline: false,
                      }
                    );
                    banLogEmbed.setColor(0xc93838);
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
          message.channel
            .send(banEmbeds.noMemberFoundEmbed)
            .then((msg) => msg.delete({ timeout: 3000 }));
        }
      } else {
        return message.channel.send(banEmbeds.noMentionEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      }
    }
  },
};
