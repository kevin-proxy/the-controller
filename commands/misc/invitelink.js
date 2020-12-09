const Commando = require("discord.js-commando");

module.exports = class invitelinkCommand extends (
  Commando.Command
) {
  constructor(client) {
    super(client, {
      name: "invitelink",
      group: "info",
      guildOnly: true,
      memberName: "invitelink",
      description: 'Sends the permanent invite link for "The Arcade" server',
    });
  }
  async run(message, args) {
    message.channel.send(
      "**The invite link for The Arcade is:**\n\nhttps://discord.gg/c8n6mRT"
    );
  }
};
