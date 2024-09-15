const axios = require('axios');

module.exports.config = {
    name: "ai2",
    role: 0,
    credits: "chill",
    description: "Interact with Gemini",
    hasPrefix: false,
    version: "1.0.0",
    aliases: ["gemini"],
    usage: "gemini [reply to photo]"
};

module.exports.run = async function ({ api, event, args }) {
    const input = args.join(" ");

    if (!input) {
        return api.sendMessage('This cmd only works in photo.', event.threadID, event.messageID);
    }

    if (event.type !== "message_reply" || !event.messageReply.attachments[0] || event.messageReply.attachments[0].type !== "photo") {
        return api.sendMessage('Please reply to a photo with this command.', event.threadID, event.messageID);
    }

    const url = encodeURIComponent(event.messageReply.attachments[0].url);
    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('𝙱𝙾𝙶𝙰𝚁𝚃 𝙰𝙸 𝙱𝙾𝚃 𝚁𝙴𝙲𝙾𝙶𝙽𝙸𝚉𝙸𝙽𝙶 𝙸𝙼𝙰𝙶𝙴, 𝙿𝙻𝙴𝙰𝚂𝙴 𝚆𝙰𝙸𝚃...', event.threadID);

        const response = await axios.get(`https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`•| 𝙱𝙾𝙶𝙰𝚁𝚃 𝙰𝙸 𝙱𝙾𝚃 |•\n\n${description}\n\n•| 𝙾𝚆𝙽𝙴𝚁 : 𝙷𝙾𝙼𝙴𝚁 𝚁𝙴𝙱𝙰𝚃𝙸𝚂 |•`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('❌ | An error occurred while processing your request.', event.threadID, event.messageID);
    }
};
