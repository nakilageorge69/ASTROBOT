const axios = require('axios');

module.exports.config = {
    name: "imgur",
    version: "2.1.0",
    hasPermission: 0,
    credits: "KENLIEPLAYS",
    description: "imgur upload",
    commandCategory: "imgur",
    usages: "[reply to image]",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function ({ api, event }) {
    try {
        const { messageID, messageReply } = event;
        const imageUrl = messageReply.attachments[0]?.url; 

        if (!imageUrl) {
            return api.sendMessage('Please reply to an image.', event.threadID, messageID);
        }

        const res = await axios.get(`https://api.kenliejugarap.com/imgur/?imageLink=${encodeURIComponent(imageUrl)}`);

        if (res.data.error) {
            return api.sendMessage(res.data.error, event.threadID, messageID);
        }

        const imgurLink = res.data.link;
        return api.sendMessage(`Here is your imgur link:\n${imgurLink}`, event.threadID, messageID);
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(
            `An error occurred while uploading the image. Please try again later. Error details: ${error.message}`,
            event.threadID,
            messageID
        );
    }
};
