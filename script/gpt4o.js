const axios = require('axios');
module.exports.config = {
  name: 'gpt4o',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'GeoDevz69',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀:\n━━━━━━━━━━━\n\n Provide question like ai3 pogi ba si George?`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(``, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://api.kenliejugarap.com/freegpt4o8k/?question=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀:\n━━━━━━━━━━━\n\n' + response + '\n━━━━━━━━━━━\n💨 Don't Forget to Follow : https://www.facebook.com/geotechph.net', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
