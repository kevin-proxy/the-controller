const Discord = require("discord.js");
module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    member.roles.add("766033819945271326");

    const logEmbed = new MessageEmbed()
      .setTitle("Member joined")
      .setDescription(
        `**Tag:** ${targetUser.tag}\n**ID:** ${
          targetUser.id
        }\n**Account Type:** ${targetUser.bot ? "Bot" : "User"}`
      )
      .setColor(0x87f558)
      .setThumbnail(
        targetUser.displayAvatarURL({
          dynamic: true,
        })
      )
      .addFields(
        {
          name: "Account Created At",
          value: `${member.createdAt}`,
          inline: true,
        },
        {
          name: "Joined Server At",
          value: `${member.joinedAt}`,
          inline: true,
        }
      )
      .setFooter(`Current member count: ${member.guild.memberCount}`)
      .setTimestamp();
    const channel = member.guild.channels.cache.find(
      (ch) => ch.id === "769314874970603590"
    );
    if (!channel) return;
    channel.send(logEmbed);

    const welcomeChannel = member.guild.channels.cache.find(
      (ch) => (ch.id = "772522158123515904")
    );
    const welcomeEmbed = new Discord.MessageEmbed()
      .setDescription(
        `${member}, welcome to ${member.guild.name}! You are the ${member.guild.memberCount}th member. Here, you can find a range of fun bot games including: Dank Memer, Myuu, Unbelievaboat, IdleRPG and more plus a friendly and welcoming community! We hope you enjoy your stay here!`
      )
      .setColor(0x3366ff);
    welcomeChannel.send(welcomeEmbed);
  });
};
