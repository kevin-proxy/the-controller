const Discord = require("discord.js");
const Commando = require("discord.js-commando");
module.exports = class unmuteCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "unmute",
      group: "mod",
      memberName: "unmute",
      description: "Unmutes members",
      userPermissions: ["MUTE_MEMBERS"],
      guildOnly: true,
    });
  }
  async run(message, args) {
    const targetUser = message.mentions.users.first();
    const mutedRole = message.guild.roles.cache.find((r) => r.name === "Muted");
    const member = message.guild.member(targetUser);
    const time = args[1];
    let reason = args.slice(2).join(` `);

    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      const permissionEmbed = new Discord.MessageEmbed();
      permissionEmbed.setDescription(
        `${emojis.cross} You do not have permission to unmute members!`
      );
      permissionEmbed.setColor(0x3366ff);
      message.channel.send(permissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else {
      if (targetUser) {
        if (!!member.roles.cache.has(mutedRole)) {
          if (!reason) {
            reason = "Unspecified";
          }
          const muteLogEmbed = new Discord.MessageEmbed();
          muteLogEmbed.setTitle(`Unmute`);
          muteLogEmbed.addFields(
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
          muteLogEmbed.setColor(0xf5a020);
          muteLogEmbed.setTimestamp();
          const muteSuccess = new Discord.MessageEmbed();
          muteSuccess.setDescription(
            `${emojis.check} Successfully unmuted ${targetUser}
            )}`
          );
          muteSuccess.setColor(0x3366ff);
          member.roles
            .remove(mutedRole)
            .then(() => {
              message.channel.send(muteSuccess).then((msg) =>
                msg.delete({
                  timeout: 3000,
                })
              );
              setTimeout(function () {
                member.roles.remove(mutedRole);
              }, ms(time));
            })
            .then(() => {
              message.guild.channels.cache
                .find((c) => c.id === "769609262636335144")
                .send(muteLogEmbed);
            })
            .catch((err) => {
              message.channel.send(errEmbed).then((msg) =>
                msg.delete({
                  timeout: 3000,
                })
              );
              console.error(err);
            });
        } else {
          const alreadyMutedEmbed = new Discord.MessageEmbed();
          alreadyMutedEmbed.setDescription(
            `${emojis.cross} That user is not muted!`
          );
          alreadyMutedEmbed.setColor(0x3366ff);
          message.channel.send(alreadyMutedEmbed).then((msg) =>
            msg.delete({
              timeout: 3000,
            })
          );
        }
      } else {
        const noMentionEmbed = new Discord.MessageEmbed();
        noMentionEmbed.setDescription(
          `${emojis.cross} Please mention a user to unmute!`
        );
        noMentionEmbed.setColor(0x3366ff);
        message.channel.send(noMentionEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      }
    }
  }
};
