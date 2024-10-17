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

    // Validate input
    if (!prompt && (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0)) {
        return api.sendMessage(
            '╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n' +
            '╰✧✧✧───────────✧\n' +
            '╭✧✧✧───────────✧\n' +
            '𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Please provide a question or reply to a photo.\n\n' +
            'Example:\nai what is the solar system?\n' +
            'Or reply to a photo with this command.\n' +
            '╰─────────────✧✧✧\n' +
            '◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n' +
            '◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n' +
            '╭✧✧✧───────────✧\n' +
            '    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\n' +
            'https://www.facebook.com/geotechph.net\n' +
            '╰─────────────✧✧✧', event.threadID, event.messageID
        );
    }

    const apiUrl = `https://ccprojectsjonellapis-production.up.railway.app/api/gemini?ask=${encodeURIComponent(prompt)}&id=${event.senderID}`;

    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('📝 Answering...', event.threadID);

        // Handle replying to an image
        if (messageReply && messageReply.attachments && messageReply.attachments[0]) {
            const attachment = messageReply.attachments[0];

            if (attachment.type === "photo") {
                const imageURL = attachment.url;
                const geminiUrl = `https://ccprojectsjonellapis-production.up.railway.app/api/gemini?ask=${encodeURIComponent(prompt)}&imgurl=${encodeURIComponent(imageURL)}`;
                const response = await axios.get(geminiUrl);
                const { vision } = response.data;

                if (vision) {
                    return api.sendMessage(createResponseMessage(vision), event.threadID, event.messageID);
                } else {
                    return api.sendMessage(createErrorMessage("Failed to recognize the image."), event.threadID, event.messageID);
                }
            }
        }

        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        return api.sendMessage(createResponseMessage(result), event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage(createErrorMessage(`An error occurred: ${error.message}`), event.threadID, event.messageID);
    }
};

// Helper function to create a response message
function createResponseMessage(content) {
    return `╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n` +
           `╰✧✧✧───────────✧\n` +
           `╭✧✧✧───────────✧\n` +
           `𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: ${content}\n` +
           `╰─────────────✧✧✧\n` +
           `◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n` +
           `◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n` +
           `╭✧✧✧───────────✧\n` +
           `    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\n` +
           `https://www.facebook.com/geotechph.net\n` +
           `╰─────────────✧✧✧`;
}

// Helper function to create an error message
function createErrorMessage(content) {
    return `╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n` +
           `╰✧✧✧───────────✧\n` +
           `╭✧✧✧───────────✧\n` +
           `𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: ${content}\n` +
           `╰─────────────✧✧✧\n` +
           `◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n` +
           `◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n` +
           `╭✧✧✧───────────✧\n` +
           `    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\n` +
           `https://www.facebook.com/geotechph.net\n` +
           `╰─────────────✧✧✧`;
                      }
