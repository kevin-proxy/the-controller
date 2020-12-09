const Discord = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class muteCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "mute",
      group: "mod",
      memberName: "mute",
      description: "Mutes members",
      guildOnly: true,
    });
  }
  async run(message, args) {
    const targetUser = message.mentions.users.first();
    const mutedRole = message.guild.roles.cache.find(
      (r) => r.id === "766778409342337084"
    );
    const member = message.guild.member(targetUser);
    const time = args[1];
    let reason = args.slice(2).join(` `);
    const ms = require("ms");
    const emojis = require("./../../index");

    if (member.roles.cache.has("749421428339638332")) {
      const isStaffEmbed = new Discord.MessageEmbed();
      isStaffEmbed.setDescription(
        `${emojis.cross} You cannot mute a member of staff!`
      );
      isStaffEmbed.setColor(0x3366ff);
      return message.channel
        .send(isStaffEmbed)
        .then((msg) => msg.delete({ timeout: 3000 }));
    } else if (member.roles.cache.has(mutedRole)) {
      const alreadyMutedEmbed = new Discord.MessageEmbed();
      alreadyMutedEmbed.setDescription(
        `${emojis.cross} That user is already muted!`
      );
      alreadyMutedEmbed.setColor(0x3366ff);
      return message.channel.send(alreadyMutedEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }
    if (!reason) {
      reason = "Unspecified";
    }
    const muteLogEmbed = new Discord.MessageEmbed();
    muteLogEmbed.setTitle(`Mute`);
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
      },
      {
        name: "Duration",
        value: time,
        inline: false,
      }
    );
    muteLogEmbed.setColor(0xf5a020);
    muteLogEmbed.setTimestamp();

    const muteSuccess = new Discord.MessageEmbed();
    muteSuccess.setDescription(
      `${emojis.check} Successfully muted ${targetUser} for ${ms(ms(time))}`
    );
    muteSuccess.setColor(0x3366ff);

    member.roles.add(mutedRole);
    setTimeout(function () {
      member.roles.remove(mutedRole);
    }, ms(time));
    message.channel.send(muteSuccess).then((msg) =>
      msg.delete({
        timeout: 3000,
      })
    );
    message.guild.channels.cache
      .find((c) => c.id === "769609262636335144")
      .send(muteLogEmbed);
  }
};
