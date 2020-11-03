const Discord = require("discord.js");

const noMentionEmbed = new Discord.MessageEmbed();
noMentionEmbed.setDescription(
  `${disapprovedEmoji} Please mention a user to ban!`
);
noMentionEmbed.setColor(0x3366ff);
exports.noMentionEmbed = noMentionEmbed;

const successEmbed = new Discord.MessageEmbed();
successEmbed.setDescription(
  `${approvedEmoji} Successfully banned ${targetUserMention}`
);
successEmbed.setColor(0x3366ff);
exports.successEmbed = successEmbed;

const noPermissionEmbed = new Discord.MessageEmbed();
noPermissionEmbed.setDescription(
  `${disapprovedEmoji} You do not have permission to ban members!`
);
noPermissionEmbed.setColor(0x3366ff);
exports.noPermissionEmbed = noPermissionEmbed;

const noMemberFoundEmbed = new Discord.MessageEmbed();
noMemberFoundEmbed.setDescription(
  `${disapprovedEmoji} I cannot find a member with that mention!`
);
noMemberFoundEmbed.setColor(0x3366ff);
exports.noMemberFoundEmbed = noMemberFoundEmbed;

const isStaffEmbed = new Discord.MessageEmbed();
isStaffEmbed.setDescription(
  `${disapprovedEmoji} You cannot ban a member of staff!`
);
isStaffEmbed.setColor(0x3366ff);
exports.isStaffEmbed = isStaffEmbed