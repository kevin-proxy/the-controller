const Discord = require('discord.js');
module.exports = {
    name: 'mute',
    description: 'A command that mutes people',
    execute(message, args){

        const user = message.mentions.users.first();
        const mutedrole = message.guild.roles.cache.find(r => r.name === "Muted");
        const member = message.guild.member(user)
        const time = args[1];

        const muteSuccessNoTime = new Discord.MessageEmbed();
        muteSuccessNoTime.setDescription(`Successfully muted ${user}`)
        muteSuccessNoTime.setColor(0x3366ff)

        const errorEmbed = new Discord.MessageEmbed();
        errorEmbed.setDescription('An error occured, please try again later...')
        errorEmbed.setColor(0x3366ff)

        const argsEmbed = new Discord.MessageEmbed();
        argsEmbed.setDescription('Please mention a user to mute!')
        argsEmbed.setColor(0x3366ff)

        const permissionEmbed = new Discord.MessageEmbed();
        permissionEmbed.setDescription('You do not have permission to mut members!')
        permissionEmbed.setColor(0x3366ff)

        const timeEmbed = new Discord.MessageEmbed();
        timeEmbed.setDescription('Please provide a valid time to mute the user for!')
        timeEmbed.setColor(0x3366ff)

        const unmuteEmbed = new Discord.MessageEmbed();
        unmuteEmbed.setDescription(`${user} has been unmuted from their timed mute.`)
        unmuteEmbed.setColor(0x3366ff)

        const alreadyMutedEmbed = new Discord.MessageEmbed();
        alreadyMutedEmbed.setDescription('That user is already muted!')
        alreadyMutedEmbed.setColor(0x3366ff)

        const staffEmbed = new Discord.MessageEmbed();
        staffEmbed.setDescription('You cannot mute a member of staff!')
        staffEmbed.setColor(0x3366ff)

        if(!message.member.hasPermission('MUTE_MEMBERS')){
            return message.channel.send(permissionEmbed).then(msg => msg.delete({timeout: 3000}));
        }
        if(member.roles.cache.has('749421428339638332')){
            return message.channel.send(staffEmbed)
        }

        if(user){
            if(!member.roles.cache.has('766778409342337084')){
                if(!time){
                    member.roles.add('766778409342337084').then(() =>{
                        message.channel.send(muteSuccessNoTime).then(msg => msg.delete({timeout: 3000}));
                    }).catch(err =>{
                        message.channel.send(errorEmbed).then(msg => msg.delete({timeout: 3000}));
                        console.error(err);
                    });
                }else{
                    let ms = require('ms');
                    const muteSuccess = new Discord.MessageEmbed();
                    muteSuccess.setDescription(`Successfully muted ${user} for ${ms(ms(time))}`)
                    muteSuccess.setColor(0x3366ff)
                    member.roles.add('766778409342337084').then(() =>{
                        message.channel.send(muteSuccess).then(msg => msg.delete({timeout: 3000}));
                        setTimeout(function() {
                            member.roles.remove(mutedrole);
                            message.channel.send(unmuteEmbed).then(msg => msg.delete({timeout: 3000}));
                        }, ms(time));
                    }).catch(err =>{
                        message.channel.send(errorEmbed).then(msg => msg.delete({timeout: 3000}));
                        console.error(err);
                    });
                }
            }else{
                message.channel.send(alreadyMutedEmbed).then(msg => msg.delete({timeout: 3000}));
            }
        }else{
            message.channel.send(argsEmbed).then(msg => msg.delete({timeout: 3000}));
        }
    },
};