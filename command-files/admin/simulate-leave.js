const Discord = require('discord.js')
module.exports = {
  name: "simulate-leave",
  description:
    "A command that simulates a user leaving the guild for testing purposes",
  execute(message, args) {
    /*if (!message.member.hasPermission('ADMINISTRATOR')){
      const noPermissionEmbed = new Discord.MessageEmbed();
      noPermissionEmbed.setDescription('You do not have permission to simulate a leave!')
      noPermissionEmbed.setColor(0x3366ff)
      return message.channel.send(noPermissionEmbed)
    }
    this.client.emit('guildMemberRemove', message.member)*/
    return;
    //command on hold
  },
};