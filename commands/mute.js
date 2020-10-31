const Discord = require("discord.js");
module.exports = {
  name: "mute",
  description: "A command that mutes people",
  execute(message, args, approvedEmoji, disapprovedEmoji, caseCount) {
    const targetUser = message.mentions.users.first();
    const mutedrole = message.guild.roles.cache.find((r) => r.name === "Muted");
    const member = message.guild.member(targetUser);
    const time = args[1];
    let reason = args.slice(2).join(` `);

    const muteSuccessNoTime = new Discord.MessageEmbed();
    muteSuccessNoTime.setDescription(
      `${approvedEmoji} Successfully muted ${targetUser}`
    );
    muteSuccessNoTime.setColor(0x3366ff);

    const argsEmbed = new Discord.MessageEmbed();
    argsEmbed.setDescription(
      `${disapprovedEmoji} Please mention a user to mute!`
    );
    argsEmbed.setColor(0x3366ff);

    const permissionEmbed = new Discord.MessageEmbed();
    permissionEmbed.setDescription(
      `${disapprovedEmoji} You do not have permission to mute members!`
    );
    permissionEmbed.setColor(0x3366ff);

    const unmuteLogEmbed = new Discord.MessageEmbed();
    unmuteLogEmbed.setTitle("Unmute");
    unmuteLogEmbed.setDescription(
      {
        name: "Type",
        value: "From timed mute",
        inline: false,
      },
      {
        name: "Moderator responisble",
        value: message.author.tag,
        value: false,
      }
    );
    unmuteLogEmbed.setColor(0x3366ff);

    const alreadyMutedEmbed = new Discord.MessageEmbed();
    alreadyMutedEmbed.setDescription(
      `${disapprovedEmoji} That user is already muted!`
    );
    alreadyMutedEmbed.setColor(0x3366ff);

    const isStaffEmbed = new Discord.MessageEmbed();
    isStaffEmbed.setDescription(
      `${disapprovedEmoji} You cannot mute a member of staff!`
    );
    isStaffEmbed.setColor(0x3366ff);

    const provideTimeEmbed = new Discord.MessageEmbed();
    provideTimeEmbed.setDescription(
      `${disapprovedEmoji} Please provide the duration of the user\'s mute!`
    );
    provideTimeEmbed.setColor(0x3366ff);

    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(permissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else {
      if (targetUser) {
        if (member.roles.cache.has("749421428339638332")) {
          return message.channel.send(isStaffEmbed);
        }
        if (!member.roles.cache.has("766778409342337084")) {
          if (!time) {
            return message.channel.send(provideTimeEmbed).then((msg) =>
              msg.delete({
                timeout: 3000,
              })
            );
          } else {
            if (!reason) {
              const muteLogEmbed = new Discord.MessageEmbed();
              muteLogEmbed.setTitle(`Mute`);
              muteLogEmbed.addFields(
                {
                  name: "Member",
                  value: `${targetUser.tag} (${member.id})`,
                  inline: false,
                },
                {
                  name: "Moderator Responsible",
                  value: message.author.username,
                  inline: false,
                },
                {
                  name: "Reason",
                  value: "Unspecified",
                  inline: false,
                },
                {
                  name: "Duration",
                  value: time,
                  inline: false,
                }
              );
              muteLogEmbed.setColor(0xf5c542);
              let ms = require("ms");
              const muteSuccess = new Discord.MessageEmbed();
              muteSuccess.setDescription(
                `Successfully muted ${targetUser} for ${ms(ms(time))}`
              );
              muteSuccess.setColor(0x3366ff);
              member.roles
                .add("766778409342337084")
                .then(() => {
                  message.channel.send(muteSuccess).then((msg) =>
                    msg.delete({
                      timeout: 3000,
                    })
                  );
                  setTimeout(function () {
                    member.roles.remove(mutedrole);
                  }, ms(time));
                })
                .then(() => {
                  message.guild.channels.cache
                    .find((c) => c.name === "—mod-log—")
                    .send(muteLogEmbed);
                })
                .catch((err) => {
                  message.channel.send("An error occured").then((msg) =>
                    msg.delete({
                      timeout: 3000,
                    })
                  );
                  console.error(err);
                });
            } else {
              const muteLogEmbed = new Discord.MessageEmbed();
              muteLogEmbed.setTitle(`Mute`);
              muteLogEmbed.addFields(
                {
                  name: "Member",
                  value: `${targetUser.tag} (${member.id})`,
                  inline: false,
                },
                {
                  name: "Moderator Responsible",
                  value: message.author.username,
                  inline: false,
                },
                {
                  name: "Reason",
                  value: reason,
                  inline: false,
                },
                {
                  name: "Duration",
                  value: time,
                  inline: false,
                }
              );
              muteLogEmbed.setColor(0xf5c542);
              let ms = require("ms");
              const muteSuccess = new Discord.MessageEmbed();
              muteSuccess.setDescription(
                `Successfully muted ${targetUser} for ${ms(ms(time))}`
              );
              muteSuccess.setColor(0x3366ff);
              member.roles
                .add("766778409342337084")
                .then(() => {
                  message.channel.send(muteSuccess).then((msg) =>
                    msg.delete({
                      timeout: 3000,
                    })
                  );
                  setTimeout(function () {
                    if (!member.roles.cache.has(mutedrole)) {
                      return;
                    } else {
                      member.roles.remove(mutedrole);
                      message.guild.channels.cache
                        .find((c) => c.name === "—mod-log—")
                        .send(unmuteLogEmbed)
                        .then((msg) =>
                          msg.delete({
                            timeout: 3000,
                          })
                        );
                    }
                  }, ms(time));
                })
                .then(() => {
                  message.guild.channels.cache
                    .find((c) => c.name === "—mod-log—")
                    .send(muteLogEmbed);
                })
                .catch((err) => {
                  message.channel.send("An error occured").then((msg) =>
                    msg.delete({
                      timeout: 3000,
                    })
                  );
                  console.error(err);
                });
            }
          }
        } else {
          message.channel.send(alreadyMutedEmbed).then((msg) =>
            msg.delete({
              timeout: 3000,
            })
          );
        }
      } else {
        message.channel.send(argsEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      }
    }
  },
};
