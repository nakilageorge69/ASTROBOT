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

    const respond = await axios.get(`https://hubs-yazky-apis.vercel.app/gpt4o?prompt=${encodeURIComponent(prompt)}`);
    const response = respond.data.response;

    await api.sendMessage({
      body: `•| 𝙱𝙾𝙶𝙰𝚁𝚃 𝙰𝙸 𝙱𝙾𝚃 |•\n\n${response}\n\n•| 𝙾𝚆𝙽𝙴𝚁 : 𝙷𝙾𝙼𝙴𝚁 𝚁𝙴𝙱𝙰𝚃𝙸𝚂 |•`,
    }, event.threadID);

  } catch (error) {
    console.error("Error:", error.message);
  }
};
