const Discord = require("discord.js");
module.exports = {
  name: "unmute",
  description: "A command that unmutes people",
  execute(message, args) {
    const targetUser = message.mentions.users.first();
    const member = message.guild.member(targetUser);
    const reason = args.slice(100).join(` `);

    const unmuteSuccess = new Discord.MessageEmbed();
    unmuteSuccess.setDescription(`Successfully unmuted ${targetUser}`);
    unmuteSuccess.setColor(0x3366ff);

    const errorEmbed = new Discord.MessageEmbed();
    errorEmbed.setDescription("An error occured, please try again later...");
    errorEmbed.setColor(0x3366ff);

    const argsEmbed = new Discord.MessageEmbed();
    argsEmbed.setDescription("Please mention a user to unmute!");
    argsEmbed.setColor(0x3366ff);

    const permissionEmbed = new Discord.MessageEmbed();
    permissionEmbed.setDescription(
      "You do not have permission to unmute members!"
    );
    permissionEmbed.setColor(0x3366ff);

    const notMutedEmbed = new Discord.MessageEmbed();
    notMutedEmbed.setDescription("That user is not muted!");
    notMutedEmbed.setColor(0x3366ff);

    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(permissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }

    if (targetUser) {
      if (member.roles.cache.has("766778409342337084")) {
        member.roles
          .remove("766778409342337084")
          .then(() => {
            message.channel.send(unmuteSuccess).then((msg) =>
              msg.delete({
                timeout: 3000,
              })
            );
          })
          .catch((err) => {
            message.channel.send(errorEmbed).then((msg) =>
              msg.delete({
                timeout: 3000,
              })
            );
            console.error(err);
          });
      } else {
        message.channel.send(notMutedEmbed).then((msg) =>
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
  },
};
