module.exports = {
  name: "ping",
  description: "A useless, basic ping command",
  execute(message) {
    message.reply("Pinging...").then((resultMessage) => {
      resultMessage.edit(
        "WebSocket Latency: `" +
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