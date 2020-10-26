const Discord = require('discord.js');
module.exports = {
  name: 'coin-flip',
  description: 'Flips a coin and tells you the result',
  execute(message){
    const tails = client.emojis.cache.find(t => t.name === 'tails')
    const heads = client.emojis.cache.find(h => h.name === 'heads')
        function doRandHT(){
            var rand = [`you got heads! ${heads}`, `you got tails! ${tails}`];
            return rand[Math.floor(Math.random()*rand.length)];
        } 
        
        message.reply(doRandHT())
  },
};
