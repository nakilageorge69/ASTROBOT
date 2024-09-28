const axios = require('axios');

module.exports.config = {
    name: "ai2",
    role: 0,
    credits: "GeoDevz69",
    description: "Interact with Gemini",
    hasPrefix: false,
    version: "1.0.0",
    aliases: ["gemini"],
    usage: "gemini [reply to photo]"
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage('╭─『 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 』✧✧✧\n│\nThis cmd only works in photo.\nKindly send image and reply this command.\n\nExample:\nai2 answer this image correctly or\nai2 explain this image correctly\n╰─────────────✧✧✧\n💕 ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ 💕', event.threadID, event.messageID);
    }

    const url = encodeURIComponent(event.messageReply.attachments[0].url);
    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('💬 Responding...', event.threadID);

        const response = await axios.get(`https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`╭─『 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 』✧✧✧\n│\n𝘼𝙣𝙨𝙬𝙚𝙧: ${description}\n╰─────────────✧✧✧\n💕 ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ 💕`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('╭─『 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 』✧✧✧\n│\nTsskk...🙄 ayusin monga tanong mo 🤨.\n╰─────────────✧✧✧\n💕 ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ 💕', event.threadID, event.messageID);
    }
};
