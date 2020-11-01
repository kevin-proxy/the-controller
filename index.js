//bot configuration
const Discord = require("discord.js");
const client = new Discord.Client();
global.client = client;
const fs = require("fs");

//event: ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.username}`);
  client.user.setActivity("arcade help");
});

//event: message
client.on("message", (message) => {
  //configuration
  client.commands = new Discord.Collection();
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }

  //neccesary variables
  const { prefix } = require("./config.json");
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  //checkpoint
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!client.commands.has(command)) return;
  if (message.channel.type == "dm") return;
  if (message.guild.name !== "The Arcade") return;

  //emojis
  const approvedEmoji = client.emojis.cache.find((e) => e.name === "approved");
  const disapprovedEmoji = client.emojis.cache.find(
    (e) => e.name === "disapproved"
  );
  const warningEmoji = client.emojis.cache.find((e) => e.name === "warning");

  //.catch error embed
  const errEmbed = new Discord.MessageEmbed();
  errEmbed.setDescription(`Something went wrong, try again later...`);
  errEmbed.setColor(0x3366ff);

  //command handler
  try {
    client.commands
      .get(command)
      .execute(
        message,
        args,
        approvedEmoji,
        disapprovedEmoji,
        warningEmoji,
        errEmbed
      );
  } catch (err) {
    console.error(err);
    message.channel.send(errEmbed).then((msg) =>
      msg.delete({
        timeout: 3000,
      })
    );
  }
});

//event: guildmemberremove (member leaves)
client.on("guildMemberRemove", (member) => {
  const removeMemberEmbed = new Discord.MessageEmbed();
  removeMemberEmbed.setTitle("User left");
  removeMemberEmbed.setDescription(
    `**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}`
  );
  removeMemberEmbed.setColor(0xff3838);
  removeMemberEmbed.setThumbnail(
    `${member.user.displayAvatarURL({ dynamic: true })}`
  );
  removeMemberEmbed.setFooter(
    `Current member count: ${member.guild.memberCount}`
  );

  const channel = member.guild.channels.cache.find(
    (ch) => ch.id === "769314874970603590"
  );
  if (!channel) console.log("Event: guildMemberRemove error, no channel found");
  channel.send(removeMemberEmbed);
});

//event: guildmemberadd (member joins)
client.on("guildMemberAdd", (member) => {
  member.roles.add("766033819945271326");

  const addMemberEmbed = new Discord.MessageEmbed();
  addMemberEmbed.setTitle(`User joined`);
  addMemberEmbed.setDescription(
    `**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Bot Account:** ${member.user.bot}\n`
  );
  addMemberEmbed.addField("Account created at:", `${member.user.createdAt}`);
  addMemberEmbed.setColor(0x79fc38);
  addMemberEmbed.setThumbnail(
    `${member.user.displayAvatarURL({ dynamic: true })}`
  );
  addMemberEmbed.setFooter(`Current member count: ${member.guild.memberCount}`);

  const channel = member.guild.channels.cache.find(
    (ch) => ch.id === "769314874970603590"
  );
  if (!channel) console.log("Event: guildMemberAdd error, no channel found");
  channel.send(addMemberEmbed).then(() => {
    const welcomeChannel = member.guild.channels.cache.find(
      (ch) => (ch.id = "772522158123515904")
    );
    const welcomeEmbed = new Discord.MessageEmbed();
    welcomeEmbed.setDescription(
      `${member}, welcome to ${member.guild.name}! You are the ${member.guild.memberCount}th member. Here, you can find a range of fun bot games including: Dank Memer, Myuu, Unbelievaboat, IdleRPG and more plus a friendly and welcoming community! We hope you enjoy your stay here!`
    );
    welcomeEmbed.setColor(0x3366ff);
    welcomeChannel.send(welcomeEmbed);
  });
});

//log in
client.login(process.env.BOT_TOKEN);
