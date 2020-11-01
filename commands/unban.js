const Discord = require("discord.js");
module.exports = {
  name: "unban",
  description: "Unban members",
  execute(message, args, errEmbed, approvedEmoji, disapprovedEmoji) {
    const userID = args[0];
    const bannedUser = bans.find((b) => b.user.id == userID);
    const reason = args.slice(1).join(` `);

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription(
        `${disapprovedEmoji} You do not have permission to unban members!`
      );
      noPermissionEmbed.setColor(0x3366ff);
      return message.channel.send(noPermissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else {
      if (userID) {
        if (bannedUser) {
          if (reason) {
            message.guild.fetchBans().then((bans) => {
              if (bans.size == 0) return;
              message.guild.members
                .unban(bannedUser.user)
                .then(() => {
                  const successEmbed = new Discord.MessageEmbed();
                  successEmbed.setDescription(
                    `${approvedEmoji} Successfully unbanned ${userID}`
                  );
                  successEmbed.setColor(0x3366ff);
                  message.channel.send(successEmbed);
                })
                .then(() => {
                  const unbanLogEmbed = new Discord.MessageEmbed();
                  unbanLogEmbed.setTitle("Unban");
                  unbanLogEmbed.addFields(
                    {
                      name: "ID of unbanned member",
                      value: userID,
                      inline: true,
                    },
                    {
                      name: "Responsible Moderator",
                      value: message.author.tag,
                      inline: true,
                    },
                    {
                      name: "Reason",
                      value: reason,
                      inline: true,
                    }
                  );
                  message.guild.channels.cache
                    .find((c) => c.id === "769609262636335144")
                    .send(unbanLogEmbed);
                })
                .catch((err) => {
                  message.channel.send(errEmbed).then((msg) =>
                    msg.delete({
                      timeout: 3000,
                    })
                  );
                  console.error(err);
                });
            });
          } else {
            message.guild.fetchBans().then((bans) => {
              if (bans.size == 0) return;
              message.guild.members
                .unban(bannedUser.user)
                .then(() => {
                  const successEmbed = new Discord.MessageEmbed();
                  successEmbed.setDescription(
                    `${approvedEmoji} Successfully unbanned ${userID}`
                  );
                  successEmbed.setColor(0x3366ff);
                  message.channel.send(successEmbed);
                })
                .then(() => {
                  const unbanLogEmbed = new Discord.MessageEmbed();
                  unbanLogEmbed.setTitle("Unban");
                  unbanLogEmbed.addFields(
                    {
                      name: "ID of unbanned member",
                      value: userID,
                      inline: true,
                    },
                    {
                      name: "Responsible Moderator",
                      value: message.author.tag,
                      inline: true,
                    },
                    {
                      name: "Reason",
                      value: "Unspecified",
                      inline: true,
                    }
                  );
                  message.guild.channels.cache
                    .find((c) => c.id === "769609262636335144")
                    .send(unbanLogEmbed);
                })
                .catch((err) => {
                  message.channel.send(errEmbed).then((msg) =>
                    msg.delete({
                      timeout: 3000,
                    })
                  );
                  console.error(err);
                });
            });
          }
        } else {
          const noMemberEmbed = new Discord.MessageEmbed();
          noMemberEmbed.setDescription("Cannot find a user with that ID!");
          noMemberEmbed.setColor(0x3366ff);
          message.channel.send(noMemberEmbed);
        }
      } else {
        const noIdEmbed = new Discord.MessageEmbed();
        noIdEmbed.setDescription(
          `${disapprovedEmoji} Please provide the ID of a banned user to unban!`
        );
        noIdEmbed.setColor(0x3366ff);
        message.channel.send(noIdEmbed);
      }
    }
  },
};
