const Discord = require('discord.js')
module.exports = {
    name: "server-info",
    description: "A command that provides a detailed descriptin of the server",
    execute(message, args){
        const serverEmbed = new Discord.MessageEmbed();
        serverEmbed.setTitle(message.guild.name)
        serverEmbed.addFields(
            {name: "Member count", value: message.guild.memberCount, inline: true},
            {name: "Owner", value: message.guild.owner.user.username, inline: true}
        )
        serverEmbed.setColor(0x3366ff)
        serverEmbed.setFooter(`Requested by ${message.author.username}`)
        serverEmbed.setTimestamp()
        serverEmbed.setThumbnail(message.guild.iconURL({dynamic: true}))

        message.channel.send(serverEmbed)
    },
};