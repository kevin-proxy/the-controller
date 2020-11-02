const Discord = require("discord.js");
module.exports = {
  name: "ask-trump",
  description: "Build a wall!",
  execute(message, args) {
    function askTrump() {
      var replies = [
        "China!",
        "We need to build a wall!",
        "Make America great again!",
        "I love China!",
        "Keep out all the Mexicans!",
        "All Muslims are terrorists!",
        "I'm the least racist person you have ever interviewed!",
        "Fuck Hilary Clinton!",
        "I have tremendous respect for women!",
        "Why are we having people from shithole countries come here?",
        "DON'T VOTE FOR THE DEMOCRATS!",
        "All Mexicans are rapists!",
        "We need to punish China for the chinavirus!",
        "CHINA!",
        "We have reached stage 1 of the China and America trade deal.",
        "CHINA!",
        "Masks don't prevent the chinavirus!",
        "SANCTIONS!",
        "Kim Jong Un is gae!",
        "Eat my ass Biden!",
        "I will build a great, great wall on our southern border, and I will have Mexico pay for that wall. Mark my words.",
        "I will be phenomenal to the women. I mean, I want to help women.",
        "Climate change is a myth!",
        "TARIFFS!",
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
    if (!args[0]) {
      message.reply("Give me something to ask trump, stupid");
    } else {
      message.reply(trumpEmbed);
    }
  },
};
