const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = Discord

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
client.login(process.env.BOT_TOKEN);
