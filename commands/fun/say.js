const Commando = require("discord.js-commando");

module.exports = class sayCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "say",
      group: "fun",
      memberName: "say",
      description: "Repeats all of your arguments",
      guildOnly: true,
    });
  }
  async run(message, args) {
    if (!args[1])
      return message.reply("You have to give me something to say silly");
    let say = args.slice(1).join(` `)
    message.channel.send(say);
  }
};
