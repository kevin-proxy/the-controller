module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    const removeMemberEmbed = new Discord.MessageEmbed();
    removeMemberEmbed.setTitle("User left");
    removeMemberEmbed.setDescription(
      `**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}`
    );
    removeMemberEmbed.setColor(0xff3838);
    removeMemberEmbed.setThumbnail(
      `${member.user.displayAvatarURL({ dynamic: true })}`
    );
    removeMemberEmbed.setFooter(
      `Current member count: ${member.guild.memberCount}`
    );
    const channel = member.guild.channels.cache.find(
      (ch) => ch.id === "769314874970603590"
    );
    if (!channel)
      console.log("Event: guildMemberRemove error, no channel found");
    channel.send(removeMemberEmbed);
  });
};
