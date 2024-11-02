const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    aliases: [
              'hi',
              'answer',
              'bro',
              'low',
              'loe',
              'identify',
              'give',
              'provide',
              'choose',
              'which',
              'magbigay',
              'make',
              'gumawa',
              'sagutin',
              'evaluate',
              'hello',
              'meta',
              'boss',
              'what',
              'who',
              'where',
              'why',
              'when',
              'ask',
              'gpt4',
              'is',
              'ano',
              'paano',
              'gaano',
              'kailan',
              'saan',
              'sino',
              'tol',
              'bot',
              'guys',
              'yo',
              'george',
              'loy',
              'admin',
              'hoy',
              'kol',
              'hey',],
    credits: "GeoDevz", // cmd by George, not the API
    description: "GPT architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        // Include replied message in the prompt if it exists
        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        // If no prompt is provided, send a help message
        if (!prompt) {
            return api.sendMessage(
                `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙂𝙪𝙞𝙙𝙚: Hello! maaring busy pa si admin ngayon. Ano maipag-lilingkod ko sayo? I am 𝗠𝗲𝘁𝗮 𝗔𝗜 created by george nakila, single na mabait, kalog, sweet at di babaero.\nBtaw kung gusto mo gumamit ng AI nato kindly follow examples below.\n\n𝙴𝚇𝙰𝙼𝙿𝙻𝙴:\nai define love in one word?\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
                event.threadID,
                messageID
            );
        }

        // Delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        // New API URL
        const apiUrl = `https://rest-api-production-5054.up.railway.app/ai?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
            const generatedText = response.data.message;

            // AI Answer
            api.sendMessage(
                `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: ${generatedText}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
                event.threadID,
                messageID
            );
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(
                `❌ 𝙰𝙽 𝙴𝚁𝚁𝙾𝚁 𝙾𝙲𝙲𝚄𝚁𝚁𝙴𝙳 𝚆𝙷𝙸𝙻𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝚃𝙷𝙴 𝚃𝙴𝚇𝚃 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴. 𝙿𝙻𝙴𝙰𝚂𝙴 𝚃𝚁𝚈 𝙰𝙶𝙰𝙸𝙽 𝙻𝙰𝚃𝙴𝚁. 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴 𝙳𝙰𝚃𝙰: ${JSON.stringify(response.data)}`,
                event.threadID,
                messageID
            );
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(
            `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\nSorry, down pa yong API, baka pwedeng mag-antay ka nalang muna. Inaayos pa ni admin George Nakila yong API. Thanks for understanding 🥰: ${error.message}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`,
            event.threadID,
            messageID
        );
    }
};
