const { MessageEmbed } = require("discord.js");
const prettyMs = require("pretty-ms");

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      const unkownPermissionNodeEmbed = new MessageEmbed();
      unkownPermissionNodeEmbed.setTitle("INTERNAL_ERROR");
      unkownPermissionNodeEmbed.setDescription(
        `Unknown permission node "${permission}"`
      );
      unkownPermissionNodeEmbed.setColor(0x3366ff);
      throw new Error(unkownPermissionNodeEmbed);
    }
  }
};

let recentlyRan = [];

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    permissionError = "You do not have permission to run this command.",
    minArgs = 0,
    maxArgs = null,
    cooldown = -1,
    requiredChannel = "",
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  if (typeof commands === "string") {
    commands = [commands];
  }

  console.log(`Registering command "${commands[0]}"`);

  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  client.on("message", async (message) => {
    if (message.channel.type == "dm") return;
    if (message.guild.name !== "The Arcade") return;

    const { member, content, guild, channel } = message;

    const prefix = process.env.PREFIX;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (message.content.includes(command)) {
        message.delete();
      }

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        if (requiredChannel && requiredChannel !== channel.name) {
          const foundChannel = guild.channels.cache.find((channel) => {
            return channel.name === requiredChannel;
          });
          const requiredChannelEmbed = new MessageEmbed();
          requiredChannelEmbed.setDescription(
            `You can only run this command inside of <#${foundChannel.id}>.`
          );
          requiredChannelEmbed.setColor(0x3366ff);
          message.reply(requiredChannelEmbed);
          return;
        }

        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError);
            return;
          }
        }

        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          );

          if (!role || !member.roles.cache.has(role.id)) {
            const noRoleEmbed = new MessageEmbed();
            noRoleEmbed.setColor(0x3366ff);
            noRoleEmbed.setDescription(
              `You must have the following role: "${requiredRole}" to use this command.`
            );
            message.reply(noRoleEmbed);
            return;
          }
        }

        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`;

        if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
          const onCooldownEmbed = new MessageEmbed();
          onCooldownEmbed.setDescription(
            `You cannot use that command so soon, the cooldown for this command is ${prettyMs(
              cooldown
            )}`
          );
          onCooldownEmbed.setColor(0x3366ff);
          message.reply(onCooldownEmbed);
          return;
        }

        const args = content.slice(prefix.length).trim().split(/ +/);
        args.shift()

        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          const syntaxErrorEmbed = new MessageEmbed();
          syntaxErrorEmbed.setTitle("SYNTAX_ERROR");
          syntaxErrorEmbed.setDescription(
            `Proper usage of this command:\n\`${prefix}${alias} ${expectedArgs}\``
          );
          syntaxErrorEmbed.setColor(0x3366ff);
          message.reply(syntaxErrorEmbed);
          return;
        }

        if (cooldown > 0) {
          recentlyRan.push(cooldownString);

          setTimeout(() => {
            console.log("Before:", recentlyRan);

            recentlyRan = recentlyRan.filter((string) => {
              return string !== cooldownString;
            });

            console.log("After:", recentlyRan);
          }, 1000 * cooldown);
        }
        callback(message, args, args.join(" "), client);

        return;
      }
    }
  });
};
