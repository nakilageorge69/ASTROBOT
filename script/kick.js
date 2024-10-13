const axios = require('axios');

module.exports.config = {
    name: "kick",
    version: "1.0.0",
    hasPermission: 1, // Assuming admin permission is required
    credits: "Your Name",
    description: "Remove the tagged user from the group",
    usePrefix: false,
    commandCategory: "Admin",
    cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID } = event;
    const mention = Object.keys(event.mentions);

    if (mention.length === 0) {
        return api.sendMessage("╭─『 𝗦𝗜𝗣𝗔 𝗧𝗜𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: You need to tag someone to kick.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧", threadID, messageID);
    }

    try {
        const info = await api.getThreadInfo(threadID);

        if (!info.adminIDs.some(item => item.id === api.getCurrentUserID())) {
            return api.sendMessage("╭─『 𝗦𝗜𝗣𝗔 𝗧𝗜𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Bot needs admin privileges to perform this action. Please add the bot as an admin.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧", threadID, messageID);
        }

        if (!info.adminIDs.some(item => item.id === event.senderID)) {
            return api.sendMessage("╭─『 𝗦𝗜𝗣𝗔 𝗧𝗜𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: You need to be an admin to kick someone.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧", threadID, messageID);
        }

        for (let userId of mention) {
            setTimeout(() => {
                api.removeUserFromGroup(userId, threadID);
            }, 3000);
        }

        return api.sendMessage("╭─『 𝗦𝗜𝗣𝗔 𝗧𝗜𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: ⏳ Kicking the mentioned user(s)...\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧", threadID, messageID);
    } catch (error) {
        console.error('Error kicking user:', error);
        return api.sendMessage("╭─『 𝗦𝗜𝗣𝗔 𝗧𝗜𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: An error occurred while trying to kick the user.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧", threadID, messageID);
    }
};