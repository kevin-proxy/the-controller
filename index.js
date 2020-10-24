const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
    prefix: prefix,
    Discord: Discord
}

client.once('ready', () =>{
    console.log('Ready');
    client.user.setActivity('DM me for help! >help')
})

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
	
    const errEmbed = new Discord.MessageEmbed();
    errEmbed.setDescription('There was an error trying to execute this command!')
    errEmbed.setColor(0x3366ff)
	
    if(!client.commands.has(command)) return;

    try{
        client.commands.get(command).execute(message, args);
    }catch (err) {
        console.error(err);
        message.channel.send(errEmbed).then(msg => msg.delete({timeout: 3000}))
    }
});

client.on('guildMemberAdd', member =>{
	member.roles.add("766033819945271326").catch(console.error)
	
	const addMemberEmbed = new Discord.MessageEmbed();
	addMemberEmbed.setTitle(`User joined`)
	addMemberEmbed.setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Bot Account:** ${member.user.bot}\n`)
	addMemberEmbed.addField('Account created at:',`${member.user.createdAt}`)
	addMemberEmbed.setColor(0x79fc38)
	addMemberEmbed.setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
	
	member.guild.channels.cache.find(ch => ch.name === '—join-leave-log—').send(addMemberEmbed);
});

client.on('guildMemberRemove', member =>{
	const removeMemberEmbed = new Discord.MessageEmbed();
	removeMemberEmbed.setTitle('User left')
	removeMemberEmbed.setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}`)
	removeMemberEmbed.setColor(0xff3838)
	removeMemberEmbed.setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)

        member.guild.channels.cache.find(ch => ch.name === '—join-leave-log—').send(removeMemberEmbed);
});
client.login(process.env.BOT_TOKEN);
