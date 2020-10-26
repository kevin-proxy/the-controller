const Discord = require('discord.js')
module.exports = {
    name: "dice-roll",
    description: "Rolls two 6 faced dice",
    execute(message,args){
        function firstDie(){
            var dieOne = Math.floor(Math.random() * 6 ) + 1;
            return dieOne
        }
        function secondDie(){
            var dieTwo = Math.floor(Math.random() * 6 ) + 1;
            return dieTwo
        }

        const diceEmbed = new Discord.MessageEmbed();
        diceEmbed.setDescription(`You rolled a \`${firstDie()}\` and a \`${secondDie()}!\``)
        diceEmbed.setColor(0x3366ff)
        diceEmbed.setImage('https://i.imgur.com/csW6v0O.png')

        message.channel.send(diceEmbed)
    }
}