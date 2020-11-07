const Commando = require("discord.js-commando");
module.exports = class PingCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "misc",
      memberName: "test",
      description: "A useless ping command",
    });
  }
  async run(message) {
    message.reply("Pinging...").then((resultMessage) => {
      resultMessage.edit(
        "**Pong!**\n\nWebSocket Latency: `" +
          `${client.ws.ping}` +
          "ms`" +
          "\nMessage Edit Latency: " +
          "`" +
          `${resultMessage.createdTimestamp - message.createdTimestamp}` +
          "ms`"
      );
    });
  }
};
