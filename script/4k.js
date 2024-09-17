const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "4k",
    version: "1.0.0",
    role: 0,
    credits: "GeoDevz69",
    description: "Enhance an image",
    hasPrefix: false,
    aliases: ["enhanceImage"],
    usage: "[4k]",
    cooldown: 5
};

module.exports.run = async function({ api, event }) {
    try {
        
        if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
            return api.sendMessage("Please reply to an image with this command to enhance it.", event.threadID);
        }

        const attachment = event.messageReply.attachments[0];

        // mag procces lng pag may attachment
        if (attachment.type !== 'photo') {
            return api.sendMessage("Please reply to a valid image to enhance.", event.threadID);
        }

        const imageUrl = attachment.url;
        const apiUrl = `https://hiroshi-rest-api.replit.app/tools/remini?url=${encodeURIComponent(imageUrl)}`;

        api.sendMessage("💬 Responding...", event.threadID);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const enhancedImagePath = path.join(__dirname, "enhancedImage.png");

        fs.writeFileSync(enhancedImagePath, response.data);

        api.sendMessage({
            body: "Here is your enhanced image:",
            attachment: fs.createReadStream(enhancedImagePath)
        }, event.threadID, () => {
            fs.unlinkSync(enhancedImagePath);
        });

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
};
