const Commando = require("discord.js-commando");

module.exports = class githubCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "github",
      group: "info",
      memberName: "github",
      description: "Sends the link to this bot's github repository",
      guildOnly: true,
    });
  }
  async run(message, args) {
    message.channel.send(
      "**To view the GitHub repository for this bot, go to**\n\nhttps://github.com/kevin-proxy/the-controller"
    );
  }
};
