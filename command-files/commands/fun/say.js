module.exports = {
  commands: "say",
  expectedArgs: "<repeated text>",
  minArgs: 2,
  callback: (message, args) => {
    let say = message.content.split(" ");
    say.shift();
    say.shift();
    say = say.join(" ");
    message.channel.send(say);
  },
};
