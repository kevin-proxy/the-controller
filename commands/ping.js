const Discord = require('discord.js');
module.exports = {
  name: 'ping',
  description: 'A useless, basic ping command',
  execute(message, args, Discord){
    if (message.channel.type == "dm") return;
            
        const pingEmbed = new Discord.MessageEmbed();
        pingEmbed.setTitle('Pong!')
        pingEmbed.setDescription("Your ping is `" + `${Date.now() - message.createdTimestamp}` + "ms`")
        pingEmbed.setColor(0x3366ff)
            
        message.channel.send(pingEmbed);
  },
};
