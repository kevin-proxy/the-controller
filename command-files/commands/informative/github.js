module.exports = {
  commands: "github",
  callback: (message, args) => {
    message.channel.send(
      "To view the GitHub repository for this bot, go to https://github.com/kevin-proxy/the-controller"
    );
  },
};
