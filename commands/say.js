module.exports = {
  name: "say",
  description: "repeats what you send",
  execute(message) {
    let say = message.content.split(" ");
    say.shift();
    say.shift();
    say = say.join(" ");
    message.channel.send(say);
  },
};
