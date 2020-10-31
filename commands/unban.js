const Discord = require("discord.js");
module.exports = {
  name: "unban",
  description: "Unban members",
  execute(message, args) {
    const userID = args[0];
    const reason = args.slice(100).join(` `);

    const banPermissionEmbed = new Discord.MessageEmbed();
    banPermissionEmbed.setDescription(
      "You do not have permission to unban members!"
    );
    banPermissionEmbed.setColor(0x3366ff);

    const banLimitEmbed = new Discord.MessageEmbed();
    banLimitEmbed.setDescription(
      "You have exceeded the 100 word limit for your ban reason"
    );
    banLimitEmbed.setColor(0x3366ff);

    const banSuccessEmbed = new Discord.MessageEmbed();
    banSuccessEmbed.setDescription(`Successfully unbanned ${userID}`);
    banSuccessEmbed.setColor(0x3366ff);

    const banErrEmbed = new Discord.MessageEmbed();
    banErrEmbed.setDescription("An error occured, please try again later...");
    banErrEmbed.setColor(0x3366ff);

    const banArgsEmbed = new Discord.MessageEmbed();
    banArgsEmbed.setDescription(
      "Please provide a valid ID of a banned user to unban!"
    );
    banArgsEmbed.setColor(0x3366ff);

    const unbanLogEmbed = new Discord.MessageEmbed();
    unbanLogEmbed.setTitle("Case | Unban");
    unbanLogEmbed.addFields(
      {
        name: "Member's ID",
        value: userID,
        inline: true,
      },
      {
        name: "Moderator Responsible",
        value: message.author.user.username,
        inline: true,
      },
      {
        name: "Reason",
        value: reason,
        inline: true,
      }
    );

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(banPermissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }

    message.guild.fetchBans().then((bans) => {
      if (bans.size == 0) return;
      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser) return message.channel.send(banArgsEmbed);
      message.guild.members
        .unban(bUser.user)
        .then(() => {
          message.channel.send(banSuccessEmbed);
        })
        .then(() => {
          message.guild.channels.cache
            .find("769609262636335144")
            .send(unbanLogEmbed);
        })
        .catch((err) => {
          message.channel.send(banErrEmbed).then((msg) =>
            msg.delete({
              timeout: 3000,
            })
          );
          console.error(err);
        });
    });
  },
};
