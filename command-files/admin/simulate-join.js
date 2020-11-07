const Discord = require('discord.js')
const Commando = require('discord.js-commando')
module.exports = {
  name: "simulate-join",
  description:
    "A command that simulates a user joining the guild for testing purposes",
  execute(message, args) {
    /*if (!message.member.hasPermission('ADMINISTRATOR')){
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription('You do not have permission to simulate a join!')
      noPermissionEmbed.setColor(0x3366ff)
      return message.channel.send(noPermissionEmbed)
    }
    this.client.emit('guildMemberAdd', message.member)*/
    return;
    //command on hold
  },
};
