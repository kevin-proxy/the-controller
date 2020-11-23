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
    if (!args[1])
      return message.reply("You have to give me two words to clap silly");
    let say = message.content.split(" ");
    say.shift();
    say.shift();
    say = say.join(" 👏 ");
    message.channel.send(say);
  }
};
