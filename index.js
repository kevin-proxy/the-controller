const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () =>{
    console.log('Ready');
    client.user.setActivity('>commands for info')
})

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) return;

    try{
        client.commands.get(command).execute(message, args);
    }catch (error) {
        console.log(error);
        message.reply('There was an error trying to execute this command!').then(msg => msg.delete({timeout: 3000}))
    }
});

/*client.on('guildMemberAdd', member =>{
	member.roles.add(member.guild.roles.cache.find('766033819945271326'))
	
	const addMemberEmbed = new Discord.MessageEmbed();
	addMemberEmbed.setTitle(`User joined`)
	addMemberEmbed.setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Bot Account:** ${member.user.bot}\n`)
	addMemberEmbed.addField('Account Age:',`${Date.now - member.user.createdAt}`)
	addMemberEmbed.setColor(0x79fc38)
	addMemberEmbed.setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
	
	member.guild.channels.cache.find('769314874970603590').send(addMemberEmbed);
});*/

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(769314874970603590);
  if (!channel) return;
  channel.send(`${member} has joined`);
});

/*client.on('guildMemberRemove', member =>{
	const removeMemberEmbed = new Discord.MessageEmbed();
	removeMemberEmbed.setTitle('User left')
	removeMemberEmbed.setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}`)
	removeMemberEmbed.setColor(0xff3838)
	removeMemberEmbed.setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)

        member.guild.channels.cache.find('769314874970603590').send(removeMemberEmbed);
});*/
client.login(process.env.BOT_TOKEN);
