const { client } = require("./../index")

const approvedEmoji = client.emojis.cache.find((e) => e.name === "approved");
module.exports.approvedEmoji = approvedEmoji
const disapprovedEmoji = client.emojis.cache.find((e) => e.name === "disapproved");
module.exports.disapprovedEmoji = disapprovedEmoji