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

    if (!client.commands.has(command)) return;

    
    if(command === 'uno-reverse'){
        
    }/*else if(command === 'coinflip'){
        function doRandHT(){
            var rand = ['Heads!','Tails!'];
            return rand[Math.floor(Math.random()*rand.length)];
        }
        function doRandHTImage(){
            let result = [];
            var image = ['https://i.imgur.com/LH3ImeN.png','https://i.imgur.com/vn0PfEd.png']
            return image[
            
        function doRandHTImage(){
        const htEmbed = new Discord.MessageEmbed();
        htEmbed.setTitle('Coinflip results!')
        htEmbed.setDescription(doRandHT())
        htEmbed.setColor(0x3366ff)
        htEmbed.setImage()
        
        message.channel.send(htEmbed)
    }*/
});
client.login(process.env.BOT_TOKEN);
