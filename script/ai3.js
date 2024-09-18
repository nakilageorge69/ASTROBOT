const axios = require('axios');

module.exports.config = {
    name: "ai3",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "GeoDevz69", // Changed the credits to "Jay"
    description: "EDUCATIONAL",
    usePrefix: true,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const question = args.join(' ');
    const apiUrl = `https://markdevsapi-2014427ac33a.herokuapp.com/gpt4?ask=${encodeURIComponent(question)}`;

    if (!question) return api.sendMessage("send question babe balik na tayo.", event.threadID, event.messageID);

    try {
        api.sendMessage(" nag type pa si Warren pogi...", event.threadID, event.messageID);

        const response = await axios.get(apiUrl);
        const answer = response.data.answer;

        api.sendMessage(`🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${question}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\nғʀᴏᴍ: » ᴀᴅᴍɪɴ ɢᴇᴏʀᴀʏ «\n𝓒𝓻𝓮𝓭𝓲𝓽𝓼: https://www.facebook.com/geotechph.net`, event.threadID, event.messageID); // Added the FB link
    } catch (error) {
        console.error(error);
        api.sendMessage("Hindi ka nya lab sabi ni George.", event.threadID);
    }
};
