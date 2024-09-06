const axios = require('axios');

module.exports.config = {
  name: "ai",
  version: "69",
  role: 0,
  credits: "OtinXSandip", // converted by kira
  description: "ask AI",
  usages: "ask <question>",
  hasPrefix: false,
  commandCategory: "ai",
  cooldowns: 0
};
  
module.exports.run = async function ({ api, event, args, message }) {
  try {
    const prompt = event.body.trim();
    if (!prompt) {
      await api.sendMessage({ body: "Hey I am Nemo, ask me questions dear🦥" }, event.threadID);
      return;
    }

    const response = await axios.get(`https://deku-rest-api.gleeze.com/new/gemini?prompt=${encodeURIComponent(prompt)}`);
    const answer = response.data.answer;

    await api.sendMessage({
      body: `AI | 🍓
━━━━━━━━━━━━━        
${answer}
━━━━━━━━━━━━━`,
    }, event.threadID);

  } catch (error) {
    console.error("Error:", error.message);
  }
};
