module.exports = {
  commands: "say",
  expectedArgs: "<repeated text>",
  callback: (message, args) => {
    if (!args[0])
      return message.reply("You have to give me something to say silly");
    let say = message.content.split(" ");
    say.shift();
    say.shift();
    say = say.join(" ");
    message.channel.send(say);
  },
};
