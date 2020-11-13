const path = require("path");
const fs = require("fs");

module.exports = (client) => {
  const commandBase = require(`./command-base.js`);

  const commands = [];

  const readCommands = (dir) => {
    const files = fs
      .readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== "command-base.js" && file !== "load-commands.js") {
        const option = require(path.join(__dirname, dir, file));
        commands.push(option);
        if (client) {
          commandBase(client, option);
        }
      }
    }
  };

  readCommands(".");
  return commands;
};
/*client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}*/
