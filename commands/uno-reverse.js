module.exports = {
  name: 'uno-reverse',
  description: 'Lol get uno reversed',
  execute(message, args){
    if (message.channel.type == "dm") return;
        if(message.mentions.users.first()){
            message.channel.send(`Haha ${message.mentions.users.first()}, get uno reversed`,{files:["https://i.imgur.com/WUX7tbB.png"]})
        }else{
            message.channel.send('Dumbass, you just uno reversed yourself',{files:["https://i.imgur.com/WUX7tbB.png"]})
        }
  },
};
