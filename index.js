//bot configuration
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();
global.client = client

//command configuration
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//event: ready
client.once('ready', () =>{
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity('arcade help')
})

//event: message
client.on('message', message=>{
    //easter eggs
    if(message.content === "hello there"){
        message.reply('General Kenobi!')
    }
    if(message.content === "Hello there"){
        message.reply('General Kenobi!')
    }
    if(message.content === "Hello there!"){
        message.reply('General Kenobi!')
    }
    if(message.content === "hello there!"){
        message.reply('General Kenobi!')
    }
    if(message.content.startsWith('I\'m')){
        let im = message.content.split(" ")
        im.shift()
        im = im.join(" ")
        message.channel.send(`Hi ${im}, I'm dad!`)
    }
    if(message.content.startsWith('Im')){
        let im = message.content.split(" ")
        im.shift()
        im = im.join(" ")
        message.channel.send(`Hi ${im}, I'm dad!`)
    }
    if(message.content.startsWith('im')){
        let im = message.content.split(" ")
        im.shift()
        im = im.join(" ")
        message.channel.send(`Hi ${im}, I'm dad!`)
    }
    if(message.content.startsWith('i\'m')){
        let im = message.content.split(" ")
        im.shift()
        im = im.join(" ")
        message.channel.send(`Hi ${im}, I'm dad!`)
    }
    //command handling config
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    //emojis
    const approvedEmoji = client.emojis.cache.find(e => e.name === "approved")
    const disapprovedEmoji = client.emojis.cache.find(e => e.name === "disapproved")
    const warningEmoji = client.emojis.cache.find(e => e.name === "warning")

    //command execution error embed
    const errEmbed = new Discord.MessageEmbed();
    errEmbed.setDescription(`Something went wrong, try again later...`)
    errEmbed.setColor(0x3366ff)

    //command handler check
    if(!client.commands.has(command)) return;
    if(message.channel.type == 'dm') return;
    if(message.guild.name !== 'The Arcade') return;

    //command handler
    try{
        client.commands.get(command).execute(message, args, approvedEmoji, disapprovedEmoji, warningEmoji, errEmbed);
    }catch (err) {
        console.error(err);
        message.channel.send(errEmbed).then(msg => msg.delete({timeout: 3000}))
    }
});

//event: guildmemberremove (member leaves)
client.on('guildMemberRemove', member =>{
	const removeMemberEmbed = new Discord.MessageEmbed();
	removeMemberEmbed.setTitle('User left')
	removeMemberEmbed.setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}`)
	removeMemberEmbed.setColor(0xff3838)
    removeMemberEmbed.setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
    removeMemberEmbed.setFooter(`Current member count: ${member.guild.memberCount}`)

        const channel = member.guild.channels.cache.find(ch => ch.id === '—join-leave-log—').send(removeMemberEmbed)
        if(!channel) console.log('No channel found')
        channel.send(removeMemberEmbed)
});

//event: guildmemberadd (member joins)
client.on('guildMemberAdd', member =>{
	member.roles.add("766033819945271326").catch(console.error)
	
	const addMemberEmbed = new Discord.MessageEmbed();
	addMemberEmbed.setTitle(`User joined`)
	addMemberEmbed.setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Bot Account:** ${member.user.bot}\n`)
	addMemberEmbed.addField('Account created at:',`${member.user.createdAt}`)
	addMemberEmbed.setColor(0x79fc38)
    addMemberEmbed.setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
    addMemberEmbed.setFooter(`Current member count: ${member.guild.memberCount}`)
	
	const channel = member.guild.channels.cache.find(ch => ch.id === '—join-leave-log—').send(removeMemberEmbed)
        if(!channel) console.log('No channel found')
        channel.send(addMemberEmbed)
});

//log in
client.login('NjgzMDM1NzE1ODMxMjAxODI1.XllslA.W74u1ARc-c4efhpJyNVT42GYCDg');
//process.env.BOT_TOKEN