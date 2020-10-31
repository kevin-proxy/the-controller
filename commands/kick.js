const Discord = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kick members",
  execute(message, args, approvedEmoji, disapprovedEmoji, errEmbed) {
    const targetUser = message.mentions.users.first();
    let reason = args.slice(1).join(` `);
    const member = message.guild.member(targetUser);

    const kickPermissionEmbed = new Discord.MessageEmbed();
    kickPermissionEmbed.setDescription(
      `${disapprovedEmoji} You do not have permission to kick members!`
    );
    kickPermissionEmbed.setColor(0x3366ff);

    const kickArgsEmbed = new Discord.MessageEmbed();
    kickArgsEmbed.setDescription(
      `${disapprovedEmoji} Please mention a user to kick!`
    );
    kickArgsEmbed.setColor(0x3366ff);

    const isStaffEmbed = new Discord.MessageEmbed();
    isStaffEmbed.setDescription("You cannot kick a member of staff!");
    isStaffEmbed.setColor(0x3366ff);

    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.reply(kickPermissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }

    if (targetUser) {
      if (member) {
        member
          .kick({
            reason: reason,
          })
          .then(() => {
            const kickSuccessEmbed = new Discord.MessageEmbed();
            kickSuccessEmbed.setDescription(
              `${approvedEmoji} Successfully kicked ${targetUser}`
            );
            kickSuccessEmbed.setColor(0x3366ff);

            message.channel.send(kickSuccessEmbed);
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
      return message.reply(kickArgsEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }
  },
};
