const Discord = require("discord.js");
module.exports = {
  commands: "purge",
  expectedArgs: "<amount>",
  minArgs: 2,
  callback: (message, args) => {
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
    message.channel.messages
      .fetch({ limit: args[0] })
      .then((fetchedMessages) => {
        message.channel
          .bulkDelete(fetchedMessages, true)
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
              `${approvedEmoji} Successfully purged ${fetchedMessages.size} messages!`
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
            logEmbed.addFields(
              {
                name: "Responsible Moderator",
                value: message.author.tag,
                inline: false,
              },
              {
                name: "Number of messages deleted",
                value: fetchedMessages.size,
                inline: false,
              },
              {
                name: "Channel",
                value: message.channel.name,
                inline: false,
              }
            );
            logEmbed.setColor(0xf5c542);
            logEmbed.setTimestamp();
            message.guild.channels.cache
              .find((c) => c.id === "769609262636335144")
              .send(logEmbed);
          });
      });
  },
};
