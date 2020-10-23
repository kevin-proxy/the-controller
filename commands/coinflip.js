const Discord = require('discord.js');
module.exports = {
  name: 'coinflip',
  description: 'Flips a coin and tells you the result',
  execute(message, args){
    function doRandHT(){
            var rand = ['Heads!','Tails!'];
            return rand[Math.floor(Math.random()*rand.length)];
        }
            
        const htEmbed = new Discord.MessageEmbed();
        htEmbed.setTitle('Coinflip results!')
        htEmbed.setDescription(doRandHT())
        htEmbed.setColor(0x3366ff)
        
        message.channel.send(htEmbed)
  },
};
