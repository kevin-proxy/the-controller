module.exports = {
  name: "github",
  description: "sends the link to the github repository",
  execute(message, args){ 
    message.channel.send('To view the GitHub repository for this bot, go to https://github.com/akaproxygithub/the-controller')
  }
}