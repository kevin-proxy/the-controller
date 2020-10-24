const Discord = require('discord.js');
module.exports = {
    name: 'mute',
    description: 'A command that mutes people',
    execute(message, args){

        const ms = require('ms');
        const user = message.mentions.users.first();
        const mutedrole = message.guild.roles.cache.find(r => r.name === "Muted");
        const member = message.guild.member(user)
        const time = args[1];
        const reason = args[2];

        const muteSuccess = new Discord.MessageEmbed();
        muteSuccess.setDescription(`Successfully muted ${user}`)
        muteSuccess.setColor(0x3366ff)

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

        if (message.channel.type == "dm") return;

        if(!message.member.hasPermission('MUTE_MEMBERS')){
            return message.channel.send(permissionEmbed).then(msg => msg.delete({timeout: 3000}));
        }

        if(user){
            if(!time){
                return message.channel.send(timeEmbed).then(msg => msg.delete({timeout: 3000}));
            }

            member.roles.add('766778409342337084').then(() =>{
                setTimeout(function() {
                    member.roles.remove(mutedrole);
                    message.channel.send(unmuteEmbed).then(msg => msg.delete({timeout: 3000}));
                }, ms(time));
                message.channel.send(muteSuccess).then(msg => msg.delete({timeout: 3000}));
            }).catch(err =>{
                message.channel.send(errorEmbed).then(msg => msg.delete({timeout: 3000}));
                console.error(err);
            });
        }else{
            message.channel.send(argsEmbed);
        }
    },
};