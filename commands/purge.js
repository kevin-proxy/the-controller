const Discord = require('discord.js');
module.exports = {
  name: 'purge',
  description: 'BulkDelete up to 99 messages.',
  execute(message, args, Discord){
    if (message.channel.type == "dm"){
      return;
    }
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
                
            const purgePermissionEmbed = new Discord.MessageEmbed();
            purgePermissionEmbed.setDescription('You do not have permission to purge messages!')
            purgePermissionEmbed.setColor(0x3366ff)
                
            return message.reply(purgePermissionEmbed);
                
            }else if(isNaN(args[0])){
                
            const purgeNaNEmbed = new Discord.MessageEmbed();
            purgeNaNEmbed.setDescription('Please provide a number of messages to purge!')
            purgeNaNEmbed.setColor(0x3366ff)
                
            return message.reply(purgeNaNEmbed).then(msg => msg.delete({timeout: 3000}));
                
            }else if(args[0] < 2 || args[0] > 99){
                
            const purgeBetweenEmbed = new Discord.MessageEmbed();
            purgeBetweenEmbed.setDescription('Please provide a number between or equal to 2 and 99!')
            purgeBetweenEmbed.setColor(0x3366ff)
                
            return message.reply(purgeBetweenEmbed).then(msg => msg.delete({timeout: 3000}));
                
            }
            
            const purgeErrEmbed = new Discord.MessageEmbed();
            purgeErrEmbed.setDescription('An error occured, please try again later...')
            purgeErrEmbed.setColor(0x3366ff)
            
            message.channel.bulkDelete(parseInt(args[0]) + 1, true).catch(err =>{
            console.error(err);
            message.channel.send(purgeErrEmbed).then(msg => msg.delete({timeout: 3000}));
            }).then(()=>{
            
            const purgeClearedEmbed = new Discord.MessageEmbed();
            purgeClearedEmbed.setDescription(`Successfully purged ${args[0]} messages!`)
            purgeClearedEmbed.setColor(0x3366ff)
            
            message.channel.send(purgeClearedEmbed).then(msg => msg.delete({timeout: 3000}));
            }).catch(err => {
            console.error(err);
            })
  },
};
