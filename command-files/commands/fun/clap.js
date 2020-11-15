module.exports = {
  commands: "clap",
  callback: (message, args, text, client) => {
    if (!args[1])
      return message.reply("You have to give me two words to clap silly");
    let say = message.content.split(" ");
    say.shift();
    say.shift();
    say = say.join(" 👏 ");
    message.channel.send(say);
  },
};
