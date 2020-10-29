const Discord = require('discord.js');
module.exports = {
  name: 'ban',
  description: 'Ban members',
  execute(message, args, approvedEmoji, disapprovedEmoji, warningEmoji){
        
        const user = message.mentions.users.first();
        const reason = args.slice(100).join(` `);
        const member = message.guild.member(user);
        
        const banPermissionEmbed = new Discord.MessageEmbed();
        banPermissionEmbed.setDescription(`${disapprovedEmoji} You do not have permission to ban members!`)
        banPermissionEmbed.setColor(0x3366ff)
        
        const banLimitEmbed = new Discord.MessageEmbed();
        banLimitEmbed.setDescription(`${disapprovedEmoji} You have exceeded the 100 word limit for your ban reason`)
        banLimitEmbed.setColor(0x3366ff)
        
        const banSuccessEmbed = new Discord.MessageEmbed();
        banSuccessEmbed.setDescription(`${approvedEmoji} Successfully banned ${user}`)
        banSuccessEmbed.setColor(0x3366ff)
        
        const banErrEmbed = new Discord.MessageEmbed();
        banErrEmbed.setDescription(`${warningEmoji} An error occured, please try again later...`)
        banErrEmbed.setColor(0x3366ff)
        
        const banArgsEmbed = new Discord.MessageEmbed();
        banArgsEmbed.setDescription(`${disapprovedEmoji} Please mention a user to ban!`)
        banArgsEmbed.setColor(0x3366ff)

        const isStaffEmbed = new Discord.MessageEmbed();
        isStaffEmbed.setDescription(`${disapprovedEmoji}You cannot ban a member of staff!`)
        isStaffEmbed.setColor(0x3366ff)
        
        if(!message.member.hasPermission('BAN_MEMBERS')){
           return message.channel.send(banPermissionEmbed).then(msg => msg.delete({timeout: 3000}));
        };
        
        if(args[101]){
            return message.channel.send(banLimitEmbed).then(msg => msg.delete({timeout: 3000}));
        };
        
        if(user){
            if(member){
                if(member.roles.cache.has('749421428339638332')) {
                    return message.channel.send(isStaffEmbed)
                };
                member.ban({reason: reason}).then(() =>{
                    message.channel.send(banSuccessEmbed);
                }).catch(err =>{
                    message.channel.send(banErrEmbed).then(msg => msg.delete({timeout: 3000}));
                    console.error(err);
                });
            }
        }else{
            return message.channel.send(banArgsEmbed).then(msg => msg.delete({timeout: 3000}));
        }
  },
};
