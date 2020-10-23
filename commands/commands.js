module.exports= {
  name: 'commands',
  description: 'Lists all the possible commands with this bot',
  execute(message, args){
    if (message.channel.type == "dm") return;

        const commandsEmbed = new Discord.MessageEmbed()
        commandsEmbed.setTitle('All commands')
        commandsEmbed.addFields(
            {name: 'Moderation Commands', value: '`>kick`, `>ban`, `>purge`'},
            {name: 'Public Commands', value: '`>prefix`, `>ping`, `description`'}
            )
        commandsEmbed.setDescription('If you want a detailed description of a particular command, execute the following: `>command-info <command>` e.g. `>command-info kick`')
        commandsEmbed.setColor(0x3366ff)
        
        message.channel.send(commandsEmbed);
  },
};
