const Discord = require("discord.js");
module.exports = {
  commands: "ask-trump",
  expectedArgs: "<question>",
  minArgs: 2,
  callback: (message, args) => {
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
        "I got ligma from Melania lmao",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
    let myQuestion = message.content.split(" ");
    myQuestion.shift();
    myQuestion.shift();
    myQuestion = myQuestion.join(" ");
    const trumpEmbed = new Discord.MessageEmbed();
    trumpEmbed.setDescription(
      `**${
        message.author.username
      }:** ${myQuestion}\n\n**Trump:** ${askTrump()}`
    );
    trumpEmbed.setColor(0x3366ff);
    trumpEmbed.setImage("https://i.imgur.com/3sEhEqa.jpg");
    message.reply(trumpEmbed);
  },
};
