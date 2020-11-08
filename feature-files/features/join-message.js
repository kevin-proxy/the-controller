module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    member.roles.add("766033819945271326");
    const addMemberEmbed = new Discord.MessageEmbed();
    addMemberEmbed.setTitle(`User joined`);
    addMemberEmbed.setDescription(
      `**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Bot Account:** ${member.user.bot}\n`
    );
    addMemberEmbed.addField("Account created at:", `${member.user.createdAt}`);
    addMemberEmbed.setColor(0x79fc38);
    addMemberEmbed.setThumbnail(
      `${member.user.displayAvatarURL({ dynamic: true })}`
    );
    addMemberEmbed.setFooter(
      `Current member count: ${member.guild.memberCount}`
    );
    const channel = member.guild.channels.cache.find(
      (ch) => ch.id === "769314874970603590"
    );
    if (!channel) console.log("Event: guildMemberAdd error, no channel found");
    channel.send(addMemberEmbed).then(() => {
      const welcomeChannel = member.guild.channels.cache.find(
        (ch) => (ch.id = "772522158123515904")
      );
      const welcomeEmbed = new Discord.MessageEmbed();
      welcomeEmbed.setDescription(
        `${member}, welcome to ${member.guild.name}! You are the ${member.guild.memberCount}th member. Here, you can find a range of fun bot games including: Dank Memer, Myuu, Unbelievaboat, IdleRPG and more plus a friendly and welcoming community! We hope you enjoy your stay here!`
      );
      welcomeEmbed.setColor(0x3366ff);
      welcomeChannel.send(welcomeEmbed);
    });
  });
};
