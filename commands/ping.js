const Discord = require('discord.js');
module.exports = {
  name: 'ping',
  description: 'A useless, basic ping command',
  execute(message, args){
    message.reply('Pinging...').then((resultMessage) => {
      const pingEmbed = new Discord.MessageEmbed();
        pingEmbed.setTitle('Pong!')
        pingEmbed.setDescription("WebSocket Latency: `" + `${client.ws.ping}`+"ms`" + "\nMessage Edit Latency: " + "`" + `${resultMessage.createdTimestamp - message.createdTimestamp}` + "ms`")
        pingEmbed.setColor(0x3366ff)
            
        resultMessage.edit('Test');
    })
  },
};
