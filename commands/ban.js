const Discord = require('discord.js');
module.exports = {
  name: 'ban',
  description: 'Ban members',
  execute(message, args){
    
    if (message.channel.type == "dm") return;
        
        const user = message.mentions.users.first();
        
        const reasonBan = args.slice(100).join(` `);
        
        const banPermissionEmbed = new Discord.MessageEmbed();
        banPermissionEmbed.setDescription('You do not have permission to ban members!')
        banPermissionEmbed.setColor(0x3366ff)
        
        const banLimitEmbed = new Discord.MessageEmbed();
        banLimitEmbed.setDescription('You have exceeded the 100 word limit for your ban reason')
        banLimitEmbed.setColor(0x3366ff)
        
        const banSuccessEmbed = new Discord.MessageEmbed();
        banSuccessEmbed.setDescription(`Successfully banned ${user}`)
        banSuccessEmbed.setColor(0x3366ff)
        
        const banErrEmbed = new Discord.MessageEmbed();
        banErrEmbed.setDescription('An error occured, please try again later...')
        banErrEmbed.setColor(0x3366ff)
        
        const banArgsEmbed = new Discord.MessageEmbed();
        banArgsEmbed.setDescription('Please mention a user to ban!')
        banArgsEmbed.setColor(0x3366ff)
        
        if(!message.member.hasPermission('BAN_MEMBERS')){
           return message.channel.send(banPermissionEmbed).then(msg => msg.delete({timeout: 3000}));
        };
        
        if(args[101]){
            return message.channel.send(banLimitEmbed).then(msg => msg.delete({timeout: 3000}));
        };
        
        if(user){
            
            const memberBan = message.guild.member(user);

            if(memberBan){
                memberBan.ban({reason: reasonBan}).then(() =>{
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
