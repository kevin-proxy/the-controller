const Discord = require('discord.js');
module.exports = {
  name: 'unban',
  description: 'Unban members',
  execute(message, args){
        
        const user = message.mentions.users.first();
        
        const banPermissionEmbed = new Discord.MessageEmbed();
        banPermissionEmbed.setDescription('You do not have permission to unban members!')
        banPermissionEmbed.setColor(0x3366ff)
        
        const banLimitEmbed = new Discord.MessageEmbed();
        banLimitEmbed.setDescription('You have exceeded the 100 word limit for your ban reason')
        banLimitEmbed.setColor(0x3366ff)
        
        const banSuccessEmbed = new Discord.MessageEmbed();
        banSuccessEmbed.setDescription(`Successfully unbanned ${user}`)
        banSuccessEmbed.setColor(0x3366ff)
        
        const banErrEmbed = new Discord.MessageEmbed();
        banErrEmbed.setDescription('An error occured, please try again later...')
        banErrEmbed.setColor(0x3366ff)
        
        const banArgsEmbed = new Discord.MessageEmbed();
        banArgsEmbed.setDescription('Please mention a user to unban!')
        banArgsEmbed.setColor(0x3366ff)
        
        if(!message.member.hasPermission('BAN_MEMBERS')){
           return message.channel.send(banPermissionEmbed).then(msg => msg.delete({timeout: 3000}));
        };
        
        if(user){
            
            const member = message.guild.member(user);

            if(member){
                member.unban(id).then(() =>{
                    message.channel.send(banSuccessEmbed);
                }).catch(err =>{
                    message.channel.send(banErrEmbed).then(msg => msg.delete({timeout: 3000}));
                    console.error(err);
                });
            }
        }else{
            return message.reply(banArgsEmbed).then(msg => msg.delete({timeout: 3000}));
        }
  },
};