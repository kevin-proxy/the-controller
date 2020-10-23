module.exports = {
  name: 'user-info',
  description: 'Displays information of a user',
  execute(message, args, Discord){
    if (message.channel.type == "dm") return;

        if(!message.mentions.users.size){
            
        const memberAuthorInfo = message.guild.member(message.author)
            
        const myInfoEmbed = new Discord.MessageEmbed();
        myInfoEmbed.setTitle(message.author.username)
        myInfoEmbed.setDescription(`**Tag:** ${message.author.tag}\n**ID:** ${message.author.id}\n**Bot Account:** ${message.author.bot}\n`)
        myInfoEmbed.setColor(0x3366ff)
        myInfoEmbed.addFields(
            {name: 'Account Created At', value: `${message.author.createdAt}`, inline: true},
            {name: 'Joined Server At', value: `${memberAuthorInfo.joinedAt}`, inline: true},
            )
        myInfoEmbed.setFooter(`Requested by ${message.author.username}`)
        myInfoEmbed.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        
        return message.channel.send(myInfoEmbed);
            
        }else{
            
            const memberInfo = message.guild.member(message.mentions.users.first())
            
            const userInfoEmbed = new Discord.MessageEmbed();
            userInfoEmbed.setTitle(message.mentions.users.first().username)
            userInfoEmbed.setDescription(`**Tag:** ${message.mentions.users.first().tag}\n**ID:** ${message.mentions.users.first().id}\n**Bot Account:** ${message.mentions.users.first().bot}`)
            userInfoEmbed.setColor(0x3366ff)
            userInfoEmbed.setThumbnail(`${message.mentions.users.first().displayAvatarURL({dynamic: true})}`)
            userInfoEmbed.addFields(
                {name: 'Account Created At', value: `${message.mentions.users.first().createdAt}`, inline: true},
                {name: 'Joined Server At', value: `${memberInfo.joinedAt}`, inline: true},
                )
            userInfoEmbed.setFooter(`Requested by ${message.author.username}`)
            
            message.channel.send(userInfoEmbed);
        }
  },
};
