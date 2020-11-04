const Discord = require("discord.js");
module.exports = {
  name: "delete",
  description: "deletes a single message",
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')){
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription('You do not have permission to delete messages!')
      noPermissionEmbed.setColor(0x3366ff)
      return message.channel.send(noPermissionEmbed)
    }
    message.channel
      .bulkDelete(2)
      .then(() => {
        const deleted = new Discord.MessageEmbed();
        deleted.setDescription(`Successfully deleted a message!`);
        deleted.setColor(0x3366ff);
        message.channel.send(deleted).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        message.channel
          .send(errEmbed)
          .then((msg) => msg.delete({ timeout: 3000 }));
      });
  },
};
