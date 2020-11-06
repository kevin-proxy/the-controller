module.exports = {
  name: "ping",
  description: "A useless, basic ping command",
  execute(message, args) {
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
  },
};