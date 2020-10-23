module.exports = {
  name: 'command-info',
  description: 'Gives a description of a command',
  execute(message,args){
    if (message.channel.type == "dm") return;
        
        if(!args[0]){
            const descArgEmbed = new Discord.MessageEmbed();
            descArgEmbed.setDescription('Please provide a valid command to give a description of! You can find the commands by executing `>commands`')
            descArgEmbed.setColor(0x3366ff)

            return message.channel.send(descArgEmbed).then(msg => msg.delete({timeout: 3000}));
        }else{
           
            if(args[0] === 'kick'){
                const descKickEmbed = new Discord.MessageEmbed();
                descKickEmbed.setTitle('Command Description')
                descKickEmbed.setDescription('**Name:** Kick\n**Usage:** `>kick <user mention>`\n**Description:** A command that kicks users from the server.\n**Cooldown:** None\n**Usable in DM:** False ')
                descKickEmbed.setColor(0x3366ff)

                return message.channel.send(descKickEmbed);
            }else if(args[0] === 'ban'){
                const descBanEmbed = new Discord.MessageEmbed();
                descBanEmbed.setTitle('Command Description')
                descBanEmbed.setDescription('**Name:** Ban\n**Usage:** `>ban <user mention> <reason>`\n**Description:** A command that bans users from the server. The reason has a word limit of 100.\n**Cooldown:** None\n**Usable in DM:** False')
                descBanEmbed.setColor(0x3366ff)

                return message.channel.send(descBanEmbed);
            }else if(args[0] === 'prefix'){
                const descPrefixEmbed = new Discord.MessageEmbed();
                descPrefixEmbed.setTitle('Command Description')
                descPrefixEmbed.setDescription('**Name:** Prefix\n**Usage:** `>prefix`\n**Description:** A command that displays the prefix of this bot\n**Cooldown:** 5 seconds\n**Usable in DM:** True')
                descPrefixEmbed.setColor(0x3366ff)
                
                return message.channel.send(descPrefixEmbed);
            }else if(args[0] === 'ping'){
                const descPingEmbed = new Discord.MessageEmbed();
                descPingEmbed.setTitle('Command Description')
                descPingEmbed.setDescription('**Name:** Ping\n**Usage:** `>ping`\n**Description:** A normal, useless ping command. Displays the time in milliseconds for the bot to respond to the command.\n**Cooldown:** 5 seconds\n**Usable in DM:** True')
                descPingEmbed.setColor(0x3366ff)
                
                return message.channel.send(descPingEmbed);
            }
            const descArgInvalidEmbed = new Discord.MessageEmbed();
            descArgInvalidEmbed.setDescription('`' + `${args[0]}` + '` is not a valid command!')
            descArgInvalidEmbed.setColor(0x3366ff)

            message.channel.send(descArgInvalidEmbed)
        }
  },
};
