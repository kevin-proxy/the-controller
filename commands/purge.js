const Discord = require("discord.js");
module.exports = {
  name: "purge",
  description: "BulkDelete up to 99 messages.",
  execute(message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      const purgePermissionEmbed = new Discord.MessageEmbed();
      purgePermissionEmbed.setDescription(
        `${disapprovedEmoji} You do not have permission to purge messages!`
      );
      purgePermissionEmbed.setColor(0x3366ff);

      return message.reply(purgePermissionEmbed);
    } else if (isNaN(args[0])) {
      const purgeNaNEmbed = new Discord.MessageEmbed();
      purgeNaNEmbed.setDescription(
        `${disapprovedEmoji} Please provide a number of messages to purge!`
      );
      purgeNaNEmbed.setColor(0x3366ff);

      return message.reply(purgeNaNEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else if (args[0] < 2 || args[0] > 99) {
      const purgeBetweenEmbed = new Discord.MessageEmbed();
      purgeBetweenEmbed.setDescription(
        `${disapprovedEmoji} Please provide a number between or equal to 2 and 99!`
      );
      purgeBetweenEmbed.setColor(0x3366ff);

      return message.reply(purgeBetweenEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }
    message.channel
      .bulkDelete(parseInt(args[0]) + 1, true)
      .catch((err) => {
        console.error(err);
        message.channel.send(errEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      })
      .then(() => {
        const purgeSuccessEmbed = new Discord.MessageEmbed();
        purgeSuccessEmbed.setDescription(
          `${approvedEmoji} Successfully purged ${args[0]} messages!`
        );
        purgeSuccessEmbed.setColor(0x3366ff);

        message.channel.send(purgeSuccessEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        const logEmbed = new Discord.MessageEmbed();
        logEmbed.setTitle(`Purge`);
        logEmbed.addFields({
          name: "Responsible Moderator",
          value: message.author.tag,
          inline: false,
        });
        logEmbed.setColor(0xf5c542);
        message.guild.channels.cache
          .find((c) => c.id === "769609262636335144")
          .send(logEmbed);
      });
  },
};
