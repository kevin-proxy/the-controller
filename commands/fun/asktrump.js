const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class askTrumpCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "asktrump",
      group: "fun",
      memberName: "asktrump",
      description: "Have a totally professional interview with donald trump!",
      guildOnly: true,
    });
  }
  async run(message, args) {
    if (!args[1]) return message.reply("Give me something to ask trump silly.");
    function askTrump() {
      var replies = [
        "China!",
        "We need to build a wall!",
        "Make America great again!",
        "I love China!",
        "I'm the least racist person you have ever interviewed!",
        "I hate Hilary Clinton and Joe Biden!",
        "I have tremendous respect for women!",
        "DON'T VOTE FOR THE DEMOCRATS!",
        "We need to punish China for the chinavirus!",
        "CHINA!",
        "We have reached stage 1 of the China and America trade deal.",
        "CHINA!",
        "Masks don't prevent the chinavirus!",
        "SANCTIONS!",
        "Kim Jong Un is short and fat!",
        "I will be phenomenal to the women. I mean, I want to help women.",
        "Climate change is a myth!",
        "TARIFFS!",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
    const embed = new MessageEmbed()
      .setDescription(
        `**${
          message.author.username
        }:** ${args}\n\n**Trump:** ${askTrump()}`
      )
      .setColor(0x3366ff)
      .setImage("https://i.imgur.com/3sEhEqa.jpg");
      
    message.reply(embed);
  }
};
