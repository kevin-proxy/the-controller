const Discord = require("discord.js");
const Commando = require("discord.js-commando");
module.exports = class unbanCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "unban",
      group: "mod",
      memberName: "unban",
      description: "Unbans members",
      guildOnly: true,
    });
  }
  async run(message, args) {
    const userID = args[0];
    const reason = args.slice(1).join(` `);
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription(
        `${emojis.cross} You do not have permission to unban members!`
      );
      noPermissionEmbed.setColor(0x3366ff);
      return message.channel.send(noPermissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    } else {
      if (userID) {
        if (!reason) {
          reason = "Unspecified";
        }
        message.guild.fetchBans().then((bans) => {
          const bannedUser = bans.find((b) => b.user.id == userID);
          const noMemberEmbed = new Discord.MessageEmbed();
          noMemberEmbed.setDescription("Cannot find a user with that ID!");
          noMemberEmbed.setColor(0x3366ff);
          if (!bannedUser) return message.channel.send(noMemberEmbed);
          if (bans.size == 0) return;
          message.guild.members
            .unban(bannedUser.user)
            .then(() => {
              const successEmbed = new Discord.MessageEmbed();
              successEmbed.setDescription(
                `${emojis.check} Successfully unbanned ${userID}`
              );
              successEmbed.setColor(0x3366ff);
              message.channel.send(successEmbed);
            })
            .then(() => {
              ++caseCount;
              const unbanLogEmbed = new Discord.MessageEmbed();
              unbanLogEmbed.setTitle(`Unban | Case ${caseCount}`);
              unbanLogEmbed.addFields(
                {
                  name: "ID of unbanned member",
                  value: userID,
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
        const noIdEmbed = new Discord.MessageEmbed();
        noIdEmbed.setDescription(
          `${emojis.cross} Please provide the ID of a banned user to unban!`
        );
        noIdEmbed.setColor(0x3366ff);
        message.channel.send(noIdEmbed);
      }
    }
  }
};
