const axios = require('axios');

module.exports.config = {
  name: "ai",
  version: "69",
  role: 0,
  credits: "OtinXSandip", // converted by homer
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
      await api.sendMessage({ body: "Hey I am Bogart ask me a question." }, event.threadID);
      return;
    }

    const response = await axios.get(`https://markdevs-last-api-2epw.onrender.com/api/v3/gpt4?ask=${encodeURIComponent(prompt)}`);
    const answer = response.data.answer;

    await api.sendMessage({
      body: `•| 𝙱𝙾𝙶𝙰𝚁𝚃 𝙰𝙸 𝙱𝙾𝚃 |•\n\n${answer}\n\n•| 𝙾𝚆𝙽𝙴𝚁 : 𝙷𝙾𝙼𝙴𝚁 𝚁𝙴𝙱𝙰𝚃𝙸𝚂 |•`,
    }, event.threadID);

  } catch (error) {
    console.error("Error:", error.message);
  }
};
