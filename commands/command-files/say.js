module.exports = {
  name: "say",
  description: "repeats what you send",
  execute(message, args) {
    let say = message.content.split(" ");
    say.shift();
    say.shift();
    say = say.join(" ");
    message.channel.send(say);
  },
};
