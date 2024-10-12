const axios = require('axios');

module.exports.config = {
    name: "ai2",
    role: 0,
    credits: "GeoDevz69",
    description: "Interact with AI for educational purposes",
    hasPrefix: false,
    version: "1.0.0",
    aliases: ["chatgpt", "gpt"],
    usage: "ai [your question or reply to an image]",
};

module.exports.run = async function ({ api, event, args }) {
    const { messageReply } = event;
    const prompt = args.join(" ");

    if (!prompt && (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0)) {
        return api.sendMessage('╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Please provide a question or reply to a photo.\n\nExample:\nai what is the solar system?\nOr reply to a photo with this command.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧', event.threadID, event.messageID);
    }

    const apiUrl = `https://jonellprojectccapisexplorer.onrender.com/api/gptconvo?ask=${encodeURIComponent(prompt)}&id=${event.senderID}`;

    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('📝 Answering...', event.threadID);

        // Check if replying to a photo
        if (messageReply && messageReply.attachments && messageReply.attachments[0]) {
            const attachment = messageReply.attachments[0];
            if (attachment.type === "photo") {
                const imageURL = attachment.url;
                const geminiUrl = `https://joncll.serv00.net/chat.php?ask=${encodeURIComponent(prompt)}&imgurl=${encodeURIComponent(imageURL)}`;
                const response = await axios.get(geminiUrl);
                const { vision } = response.data;

                if (vision) {
                    return api.sendMessage(`╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: ${vision}\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event.threadID, event.messageID);
                } else {
                    return api.sendMessage("╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Failed to recognize the image.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧", event.threadID, event.messageID);
                }
            }
        }

        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        return api.sendMessage(`╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: ${result}\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage(`╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: An error occurred: ${error.message}\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event.threadID, event.messageID);
    }
};
