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
        await api.sendMessage('ðŸ’¬ Responding...', event.threadID);

        const response = await axios.get(`https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`ðŸŽ€ ð—šð—–ð—›ð—”ð—§ ð—•ð—¢ð—§ ðŸŽ€\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n${description}\n`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('âŒ | An error occurred while processing your request.', event.threadID, event.messageID);
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

    api.sendMessage(`â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n\nðŸŽ€ ð—šð—–ð—›ð—”ð—§ ð—•ð—¢ð—§ ðŸŽ€\n\n${data.message}\n\nÂ» á´á´¡É´á´‡Ê€ : É¢á´‡á´Ê€É¢á´‡ É´á´€á´‹ÉªÊŸá´€ Â«\n\n--> ðš„ðš‚ð™´ ðŸ‘‰ðŸ»"ðšŠðš’2"ðŸ‘ˆðŸ» ð™²ð™¾ð™¼ð™¼ð™°ð™½ð™³ ð™µð™¾ðš ð™¸ð™¼ð™°ð™¶ð™´/ð™¿ð™·ð™¾ðšƒð™¾ ðšð™´ð™²ð™¾ð™¶ð™½ð™¸ðšƒð™¸ð™¾ð™½`, event.threadID, event.messageID);
    
  } catch {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
