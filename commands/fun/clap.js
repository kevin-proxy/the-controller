const Commando = require("discord.js-commando");

module.exports = class clapCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "clap",
      group: "fun",
      memberName: "clap",
      description: "Repeats every argument with a clap emoji in between",
      guildOnly: true,
    });
  }

  async run(message, args) {
    if (!args[2])
      return message.reply("You have to give me two words to clap silly");
    args.join(" 👏 ");
    message.channel.send(args);
  }
};
