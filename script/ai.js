const axios = require("axios");

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "GeoDevz69",
    description: "Chat with GPT-4 using a conversational format.",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, threadID, body } = event;

        // If body does not start with "gpt4", ignore the command
        if (!body || !body.toLowerCase().startsWith("gpt4")) {
            return;
        }

        const prompt = body.slice(5).trim();

        if (!prompt) {
            return api.sendMessage(
                `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙂𝙪𝙞𝙙𝙚: Please provide a prompt to get a response from GPT4.\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
                threadID,
                messageID
            );
        }

        // Wait for a second before sending the request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const apiUrl = `https://haji-mix.gleeze.com/gpt4om?prompt=${encodeURIComponent(prompt)}`;
        let attempts = 0;
        let response;

        while (attempts < 3) {
            try {
                response = await axios.get(apiUrl);

                // Check if the response data is valid
                if (response.data && response.data.message) {
                    break;  // Exit loop if we get a valid response
                } else {
                    console.warn(`Invalid response received: ${JSON.stringify(response.data)}`);
                    attempts++;
                }
            } catch (error) {
                attempts++;
                console.error(`Attempt ${attempts} failed: ${error.message}`);
                if (attempts >= 3) {
                    return api.sendMessage(
                        `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: An error occurred while communicating with the GPT-4 API. Please try again later.\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
                        threadID,
                        messageID
                    );
                }

                // Retry after 2 seconds if the request fails
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }

        if (response && response.data && response.data.message) {
            const generatedText = response.data.message;
            api.sendMessage(
                `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: ${generatedText}.\n╰─────────────✧✧✧\n◉ 𝚁𝙀𝙿𝙇𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
                threadID,
                messageID
            );
        } else {
            api.sendMessage(
                `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: The response from the server is empty or invalid. Please try again later.\n╰─────────────✧✧✧\n◉ 𝚁𝙀𝙋𝙇𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
                threadID,
                messageID
            );
        }
    } catch (error) {
        console.error(error);
        api.sendMessage(
            `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: An error occurred while processing your request. Please try again later.\n╰─────────────✧✧✧\n◉ 𝚁𝙀𝙋𝙇𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
            threadID,
            messageID
        );
    }
};
