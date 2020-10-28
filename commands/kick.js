const Discord = require('discord.js');
module.exports = {
  name: 'kick',
  description: 'Kick members',
  execute(message, args){
        
        const userKick = message.mentions.users.first();
        
        const kickPermissionEmbed = new Discord.MessageEmbed();
        kickPermissionEmbed.setDescription('You do not have permission to kick members!')
        kickPermissionEmbed.setColor(0x3366ff)
        
        const kickErrEmbed = new Discord.MessageEmbed();
        kickErrEmbed.setDescription('An error occured, please try again later...')
        kickErrEmbed.setColor(0x3366ff)
        
        const kickArgsEmbed = new Discord.MessageEmbed();
        kickArgsEmbed.setDescription('Please mention a user to kick!')
        kickArgsEmbed.setColor(0x3366ff)
        
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply(kickPermissionEmbed).then(msg => msg.delete({timeout: 3000}));
        };

        if(userKick){

            const memberKick = message.guild.member(userKick);

            if(memberKick){
                memberKick.kick().then(() =>{
                    const kickSuccessEmbed = new Discord.MessageEmbed();
                    kickSuccessEmbed.setTitle('Success!')
                    kickSuccessEmbed.setDescription(`Successfully kicked ${userKick}`)
                    kickSuccessEmbed.setColor(0x3366ff)
                    
                    message.channel.send(kickSuccessEmbed)
                }).catch(err =>{
                    message.channel.send(kickErrEmbed).then(msg => msg.delete({timeout: 3000}));
                    console.error(err);
                });
            }
        }else{
            return message.reply(kickArgsEmbed).then(msg => msg.delete({timeout: 3000}));
        }
  },
};
