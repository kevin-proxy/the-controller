const Commando = require("discord.js-commando");

module.exports = class eightBallCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "8ball",
      group: "fun",
      memberName: "8ball",
      description: "A fun 8 ball command",
      guildOnly: true,
    });
  }

  async run(message, args) {
    if (args[0]) return message.reply("Give me something to predict silly")
    function eightBall() {
      var replies = [
        "As I see it, yes.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don’t count on it.",
        "It is certain.",
        "It is decidedly so.",
        "Most likely.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Outlook good.",
        "Reply hazy, try again.",
        "Signs point to yes.",
        "Very doubtful.",
        "Without a doubt.",
        "Yes.",
        "Yes – definitely.",
        "You may rely on it.",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
    message.reply(eightBall());
  }
};
