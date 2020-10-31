const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Lists all the possible commands with this bot",
  execute(message) {
    const commandsEmbed = new Discord.MessageEmbed();
    commandsEmbed.setTitle("Help is here!");
    commandsEmbed.setDescription(
      "To get a detailed description of a command, execute: `arcade command-info <command>` e.g. `arcade command-info dice-roll`\n\nThis bot's prefix is `arcade`"
    );
    commandsEmbed.addFields(
      {
        name: "Moderation",
        value: "`ban`, `unban`, `kick`, `mute`, `unmute`, `purge`",
        inline: false,
      },
      {
        name: "Fun",
        value:
          "`8ball`, `ask-trump`, `coin-flip`, `dice-roll`, `say`, `uno-reverse`",
        inline: false,
      },
      {
        name: "Informative",
        value:
          "`user-info`, `server-info`, `command-info`, `channel-info`, `help`",
        inline: false,
      }
    );
    commandsEmbed.setColor(0x3366ff);
    commandsEmbed.setFooter(`Requested by ${message.author.username}`);
    commandsEmbed.setTimestamp();
    commandsEmbed.setThumbnail(
      message.guild.iconURL({
        dynamic: true,
      })
    );

    message.channel.send(commandsEmbed);
  },
};
