const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "countmember",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  description: "Count all members in the group chat",
  usages: "countmember",
  credits: "GeoDevz69",
  cooldowns: 0
};

module.exports.run = async function({ api, event }) {
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const memberCount = threadInfo.participantIDs.length;
    
    api.sendMessage(`╭─『 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 』✧✧✧\n│\n𝘼𝙣𝙨𝙬𝙚𝙧: Hello Master! GeoDevz69 the total number of members in this group are: ${memberCount}\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event.threadID);
  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
