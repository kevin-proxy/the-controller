module.exports = {
  name: 'prefix',
  description: 'Displays the prefix of this bot',
  execute(message, args){
    if (message.channel.type == "dm") return;
        
        const prefixEmbed = new Discord.MessageEmbed();
        prefixEmbed.setTitle('Prefix')
        prefixEmbed.setDescription("This bot's prefix is `" + `${prefix}` + "`")
        prefixEmbed.setColor(0x3366ff)
        
        message.channel.send(prefixEmbed);
  },
};
