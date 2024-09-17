const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermission: 0,
  usePrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usages: "ai [prompt]",
  credits: 'GeoDevz69',
  cooldowns: 1,
  dependencies: {
    "axios": ""
  }
};
module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage('This cmd only works in photo.', event.threadID, event.messageID);
    }

    if (event.type !== "message_reply" || !event.messageReply.attachments[0] || event.messageReply.attachments[0].type !== "photo") {
        return api.sendMessage('Please reply to a photo with this command.', event.threadID, event.messageID);
    }

    const url = encodeURIComponent(event.messageReply.attachments[0].url);
    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('💬 Responding...', event.threadID);

        const response = await axios.get(`https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━━\n${description}\n`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('❌ | An error occurred while processing your request.', event.threadID, event.messageID);
    }
};
module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  
  if (input === "clear") {
    try {
      await axios.post('https://satomoigpt.onrender.com/clear', { id: event.senderID });
      return api.sendMessage("Chat history has been cleared.", event.threadID, event.messageID);
    } catch {
      return api.sendMessage('An error occurred while clearing the chat history.', event.threadID, event.messageID);
    }
  }

  try {
    const url = event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo"
      ? { link: event.messageReply.attachments[0].url }
      : {};

    const { data } = await axios.post('https://satomoigpt.onrender.com/chat', {
      prompt: input,
      customId: event.senderID,
      ...url
    });

    api.sendMessage(`━━━━━━━━━━━━━━━━━━━\n\n🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n\n${data.message}\n\n» ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ «\n\n--> 𝚄𝚂𝙴 👉🏻"𝚊𝚒2"👈🏻 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴/𝙿𝙷𝙾𝚃𝙾 𝚁𝙴𝙲𝙾𝙶𝙽𝙸𝚃𝙸𝙾𝙽`, event.threadID, event.messageID);
    
  } catch {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
