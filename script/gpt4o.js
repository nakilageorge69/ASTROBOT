const axios = require("axios");

module.exports.config = {
    name: "gpt4o",
    version: "1.0.0",
    credits: "GeoDevz69",
    description: "Interact with Llama AI",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["gpt4o"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("[ ❗ ] - Missing question for the ai", event.threadID, event.messageID);
        }

        const initialMessage = await new Promise((resolve, reject) => {
            api.sendMessage("Answering plss wait...", event.threadID, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            });
        });

        try {
            const response = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(q)}&uid=100`);
            const answer = response.data.response;

            const formattedResponse = `•| 𝙱𝙾𝙶𝙰𝚁𝚃 𝙰𝙸 𝙱𝙾𝚃 |•\n\n${answer}\n\n•| 𝙲𝚁𝙴𝙰𝚃𝙴𝙳 𝙱𝚈 𝙱𝙾𝙶𝙰𝚁𝚃 𝙼𝙰𝙶𝙰𝙻𝙿𝙾𝙺 |•`;

            await api.editMessage(formattedResponse, initialMessage.messageID);
        } catch (error) {
            console.error(error);
            await api.editMessage("An error occurred while processing your request.", initialMessage.messageID);
        }
    } catch (error) {
        console.error("Error in ai2 command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
