const Discord = require('discord.js');
module.exports= {
  name: 'help',
  description: 'Lists all the possible commands with this bot',
  execute(message){
    if (message.channel.type == "dm") return;

        const commandsEmbed = new Discord.MessageEmbed()
        commandsEmbed.setTitle('Help is here!')
        commandsEmbed.setDescription('Go to https://github.com/akaproxygithub/the-controller-info for a list of commands, a description of all of them and some extra info about the bot.\n\nIf you want a detailed description of a particular command directly through Discord, execute the following: `arcade command-info <command>` e.g. `arcade command-info kick`')
        commandsEmbed.setColor(0x3366ff)
        
        message.channel.send(commandsEmbed);
  },
};
