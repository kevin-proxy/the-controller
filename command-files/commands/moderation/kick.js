const Discord = require("discord.js");
module.exports = {
  commands: "kick",
  expectedArgs: "<user mention> [reason]",
  minArgs: 2,
  permissions: "KICK_MEMBERS",
  callback: (message, args) => {
    const targetUser = message.mentions.users.first();
    let reason = args.slice(1).join(` `);
    const member = message.guild.member(targetUser);
    const { approvedEmoji } = require("@util/emojis");
    const { disapprovedEmoji } = require("@util/emojis");

    if (!member) {
      const noMemberEmbed = new Discord.MessageEmbed();
      noMemberEmbed.setDescription("I cannot find a member with that mention!");
      noMemberEmbed.setColor(0x3366ff);
      return message.channel.send(noMemberEmbed);
    }
    if (member.roles.cache.has("749421428339638332")) {
      const isStaffEmbed = new Discord.MessageEmbed();
      isStaffEmbed.setDescription(
        `${disapprovedEmoji} You cannot kick a member of staff!`
      );
      isStaffEmbed.setColor(0x3366ff);
      return message.channel.send(isStaffEmbed);
    }
    if (!reason) {
      reason = "Unspecified";
    }
    member.kick({
      reason: reason,
    });
    const successEmbed = new Discord.MessageEmbed();
    successEmbed.setDescription(
      `${approvedEmoji} Successfully kicked ${targetUser}`
    );
    successEmbed.setColor(0x3366ff);
    message.channel
      .send(successEmbed)
      .then((msg) => msg.delete({ timeout: 3000 }));
    const logEmbed = new Discord.MessageEmbed();
    logEmbed.setTitle(`Kick`);
    logEmbed.addFields(
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
    logEmbed.setColor(0xc93838);
    logEmbed.setTimestamp();
    message.guild.channels.cache
      .find((c) => c.id === "769609262636335144")
      .send(logEmbed);
  },
};
