const Discord = require('discord.js')
module.exports = {
    name: "ask-trump",
    description: "Build a wall!",
    execute(message, args){
        function askTrump(){
            var replies = ['China!', 'We need to build a wall!','Make America great again!', 'I love China!','Keep out all the Mexicans!','All Muslims are terrorists!','I\'m the least racist person you have ever interviewed!','Fuck Hilary Clinton!','I have tremendous respect for women!','Why are we having people from shithole countries come here?','DON\'T VOTE FOR THE DEMOCRATS!', 'All Mexicans are rapists!']
            return replies[Math.floor(Math.random()*replies.length)]
        }
        let myQuestion = message.content.split(" ");
        myQuestion.shift();
        myQuestion.shift();
        myQuestion = myQuestion.join(" ")
        const trumpEmbed = new Discord.MessageEmbed()
        trumpEmbed.setDescription(`**${message.author.username}:** ${myQuestion}\n\n**Trump:** ${askTrump()}`)
        trumpEmbed.setColor(0x3366ff)
        trumpEmbed.setImage('https://i.imgur.com/3sEhEqa.jpg')
        if(!args[0]){
            message.reply('Give me something to ask trump, stupid')
        }else{
            message.reply(trumpEmbed);
        }
    },
};